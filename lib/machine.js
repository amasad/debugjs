var recast = require('recast');
var transform = require('./transform');
var Context = require('context-eval');
var isGenSupported = require('./is_gen_supported');
var regenerator = require('regenerator');
var fs = require('fs');

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
  this.state = this.gen.next(val);
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
function Machine(sandbox) {
  this.console = console;
  this.runner = new Runner();
  sandbox = sandbox || {};
  sandbox.__runner = this.runner;
  sandbox.__thunk = createThunk;
  sandbox.console = this.console;
  this.context = new Context(sandbox);
  this.$bootstrapRuntime();
}

/**
 * @param {string} code
 * @returns {string} transformed code.
 */
Machine.prototype.$transform = function (code) {
  var ast = recast.parse(code);
  var transformed = transform(ast);
  var transformedCode = recast.print(transformed).code;
  if (!isGenSupported) {
    transformedCode = regenerator(transformedCode);
  }
  // console.log(transformedCode);
  return transformedCode;
};

/**
 * @param {string} transformedCode
 * @return {Machine} this
 */
Machine.prototype.$evaluate = function(transformedCode) {
  this.context.evaluate(transformedCode);
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

/**
 * @public
 * @param {string} code
 * @return {Machine} this
 */
Machine.prototype.evaluate = function (code) {
  var transformed = this.$transform(code);
  this.$evaluate(transformed);
  return this;
};

/**
 * @public
 * @return {*} value from the step.
 */
Machine.prototype.step = function () {
  this.context.evaluate('__runner.step()');
  return this.runner.state;
};

/**
 * @public
 */
Machine.prototype.run = function () {
  while (!this.runner.state.done) {
    this.step();
  }
};

Machine.prototype.getCallStack = function () {
  var stack = [this.runner.gen.stackFrame];
  for (var i = this.runner.stack.length - 1; i >= 0; i--) {
    stack.unshift(this.runner.stack[i].stackFrame);
  }
  return stack;
};

module.exports = Machine;