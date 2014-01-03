var recast = require('recast');
var transform = require('./transform');
var Context = require('context-eval');
var isGenSupported = require('generator-supported');
var regenerator = require('regenerator');
var fs = require('fs');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var clone = require('lodash.clonedeep');

/**
 * @constructor
 * @param {function} fn The actual thunk function to invoke.
 * @param {object} thisp The context (this) for which the thunk existed.
 */
function Thunk(fn, thisp) {
  this.fn = fn;
  this.thisp = thisp;
}

/**
 * @return {*} either a value from a function call from outside our system or
 *              a generator object (from our system).
 */
Thunk.prototype.invoke = function () {
  return this.fn.call(this.thisp);
};

/**
 * shortcut for `Thunk` construct to not use `new`
 */
function createThunk(fn, thisp) {
  return new Thunk(fn, thisp);
}

/**
 * @constructor The runner object that lives in the sandbox to run stuff.
 */
function Runner() {}

/**
 * @param {Generator} gen The first generator in our callstack.
 */
Runner.prototype.init = function (gen) {
  this.gen = gen;
  this.stack = [];
  this.state = {
    value: null,
    done: false
  };
};

Runner.prototype.$propError = function (e) {
  while (this.stack.length) {
    this.gen = this.stack.pop();
    try {
      this.gen.throw(e);
      return;
    } catch (e2) {
      e = e2;
    }
  }
  throw e;
};

/**
 * This is the main run "loop". It maintains a callstack `this.stack` and on
 * each step it will call next on the current generator `this.gen` with an
 * optional value `val`. The resulting value from `gen.next` could be:
 *  1. a thunk, which means this is a function call
 *  2. a step info (location etc.)
 *  3. this current generator is done and the following could happen:
 *     a. a resulting generator object, which means a thunk (generator) finished
 *        executing and the result is a function call within our system that
 *        we can pop into. We simply replace the current generator with this
 *        function call
 *     b. we're done with a regular function call and we need to pass the value
 *        as the resulting `yield` expression.
 *
 * @param {*} val The value of the yield expression to pass to the generator.
 */
Runner.prototype.step = function (val) {
  try {
    this.state = this.gen.next(val);
  } catch (e) {
    this.$propError(e);
    return;
  }
  if (this.state.value && this.state.value instanceof Thunk) {
    this.stack.push(this.gen);
    this.gen = this.state.value.invoke();
    this.step();
  } else if (this.state.value && this.state.value.type === 'stackFrame') {
    this.gen.stackFrame = this.state.value;
    this.step();
  } else if (this.state.done) {
    if (this.state.value &&
        this.state.value.toString() === '[object Generator]') {
      this.gen = this.state.value;
      this.state.value.type = 'functionCall';
      this.state.done = false;
    } else if (this.stack.length) {
      this.gen = this.stack.pop();
      this.step(this.state.value);
    }
  }
};

/**
 * @public
 * @constructor
 * @param {object} sandbox An object with things to be copied into the context.
 */
function Machine(sandbox, options) {
  sandbox = sandbox || {};
  options = options || {};
  this.$anonFileId = 0;
  this.halted = false;
  this.paused = false;
  this.$runner = new Runner();
  sandbox.__runner = this.$runner;
  sandbox.__thunk = createThunk;
  sandbox.console = console;
  this.context = new Context(sandbox, options.iframeParentElement);
  this.$bootstrapRuntime();
}

inherits(Machine, EventEmitter);

/**
 * @param {string} code
 * @returns {string} transformed code.
 */
Machine.prototype.$transform = function (code, filename) {
  var ast = recast.parse(code);
  filename = filename || ('file' + (++this.$anonFileId));
  var transformed = transform(ast, filename);
  var transformedCode = recast.print(transformed).code;
  if (!isGenSupported) {
    transformedCode = regenerator(transformedCode);
  }
  return transformedCode;
};

/**
 * @param {string} transformedCode
 * @return {Machine} this
 */
Machine.prototype.$evaluate = function(transformedCode) {
  this.context.evaluate(transformedCode);
  this.halted = false;
  this.context.evaluate('__runner.init(__top());');
  return this;
};

/**
 * Bootstraps the environment with the necessary runtime.
 */
Machine.prototype.$bootstrapRuntime = function () {
  var regeneratorRuntime = fs.readFileSync(
    __dirname + '/../node_modules/regenerator/runtime/dev.js'
  ).toString();
  this.context.evaluate(regeneratorRuntime);

  var arrayRuntime = fs.readFileSync(
    __dirname + '/../runtime/compiled/array.js'
  ).toString();
  this
    .$evaluate(arrayRuntime)
    .run();
};

Machine.prototype.pause = function () {
  this.paused = true;
  return this;
};

Machine.prototype.resume = function () {
  this.paused = false;
  return this;
};

/**
 * @public
 * @param {string} code
 * @return {Machine} this
 */
Machine.prototype.evaluate = function (code, filename) {
  var transformed = this.$transform(code, filename);
  this.$evaluate(transformed);
  return this;
};

/**
 * @public
 * @return {*} value from the step.
 */
Machine.prototype.step = function () {
  try {
    this.context.evaluate('__runner.step()');
    this.halted = this.$runner.state.done;
  } catch (e) {
    this.emit('error', e);
    this.halted = true;
    return;
  }
  if (this.$runner.state.value &&
      this.$runner.state.value.type === 'debugger') {
    // When we hit a debugger statement, emit a debugger event, and if there
    // were no listeners then we recur, i.e. ignore. Otherwise we pause.
    if (this.emit('debugger', this.$runner.state.value)) {
      this.pause();
    } else {
      return this.step();
    }
  }
  return this;
};

/**
 * @public
 */
Machine.prototype.run = function () {
  while (!this.halted && !this.paused) {
    this.step();
  }
  return this;
};

/**
 * @public
 */
Machine.prototype.getCallStack = function () {
  var stack = [clone(this.$runner.gen.stackFrame)];
  for (var i = this.$runner.stack.length - 1; i >= 0; i--) {
    stack.unshift(clone(this.$runner.stack[i].stackFrame));
  }
  return stack;
};

Machine.prototype.getCurrentStackFrame = function () {
  return this.$runner.gen.stackFrame;
};

/**
 * @public
 */
Machine.prototype.getState = function () {
  return this.$runner.state;
};

module.exports = Machine;
