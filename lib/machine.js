var recast = require('recast');
var transform = require('./transform');
var Context = require('context-eval');
var isGenSupported = require('generator-supported');
var regenerator = require('regenerator');
var fs = require('fs');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

/**
 * @constructor
 * @param {function} fn The actual thunk function to invoke.
 * @param {object} thisp The context (this) for which the thunk existed.
 */
function Thunk(fn, thisp, args) {
  this.fn = fn;
  this.thisp = thisp;
  this.args = args;
}

/**
 * @return {*} either a value from a function call from outside our system or
 *              a generator object (from our system).
 */
Thunk.prototype.invoke = function () {
  return this.fn.apply(this.thisp, this.args);
};

/**
 * shortcut for `Thunk` construct to not use `new`
 */
function createThunk(fn, thisp, args) {
  return new Thunk(fn, thisp, args);
}

/**
 * @constructor
 */
function Timers() {
  this.$q = [];
  this.timeElapsed = 0;
  this.$uid = 0;
  this.$nextTick = null;
}

inherits(Timers, EventEmitter);

Timers.prototype.$scheduleNextTick = function () {
  if (this.$q.length) {
    clearTimeout(this.$nextTick);
    this.$nextTick =
      setTimeout(this.$tick.bind(this), this.$q[0].when - this.timeElapsed);
  }
};

/**
 * Main timer loop.
 */
Timers.prototype.$tick = function () {
  if (this.$idleTimeStart) {
    this.timeElapsed += Date.now() - this.$idleTimeStart;
    this.$idleTimeStart = Date.now();
  }
  var timer = this.$q[0];
  if (timer && (timer.when <= this.timeElapsed)) {
    this.$q.shift();
    if (timer.interval) {
      // Need to account for lost time between calls to the first time and
      // subsquent timers.
      var after = timer.after - (this.timeElapsed - timer.when);
      this.$setTimer(timer.genFn, after, timer.args, true, timer.id);
    }
    this.emit('timer', timer);
  }
  this.$scheduleNextTick();
};

/**
 * Sets setInterval and setTimeout timers.
 * @param {Generator Function} genFn
 * @param {number} after
 * @param {array<*>} args
 * @param {boolean} isInterval
 * @param {number} id
 * @return {number} id
 */
Timers.prototype.$setTimer = function (genFn, after, args, isInterval, id) {
  // setInterval have an Id because they repeat themselves.
  if (id == null) {
    id = ++this.$uid;
  }
  var when = this.timeElapsed + after;
  var q = this.$q;
  var i;
  // We maintain a sorted queue ascending by time to execute.
  for (i = 0; i < q.length; i++) {
    if (q[i].when > when) {
      break;
    }
  }
  q.splice(i, 0, {
    genFn: genFn,
    after: after,
    when: when,
    id: id,
    args: args,
    interval: isInterval
  });

  this.$scheduleNextTick();
  return id;
};

/**
 * @api
 * @param {Generator Function} genFn
 * @param {number} after
 * @return {number} id
 */
Timers.prototype.setTimeout = function (genFn, after) {
  var args = Array.prototype.slice.call(arguments, 2);
  return this.$setTimer(genFn, after, args, false);
};

/**
 * @api
 * @param {Generator Function} genFn
 * @param {number} after
 * @return {number} id
 */
Timers.prototype.setInterval = function (genFn, after) {
  var args = Array.prototype.slice.call(arguments, 2);
  return this.$setTimer(genFn, after, args, true);
};

/**
 * @api
 * @param {Generator Function} genFn
 * @param {number} after
 * @return {number} id
 */
Timers.prototype.clearTimeout =
Timers.prototype.clearInterval = function (id) {
  var q = this.$q;
  for (var i = 0; i < q.length; i++) {
    if (q[i].id === id) {
      q.splice(i, 1);
      break;
    }
  }
};

/**
 * Starts a timer for a single step.
 * @api
 */
Timers.prototype.step = function () {
  this.$start = Date.now();
};

/**
 * Stop and increment system time for an execution step.
 * @api
 */
Timers.prototype.stepEnd = function (halted) {
  this.timeElapsed += Date.now() - this.$start;
  if (halted) {
    this.$idleTimeStart = Date.now();
  } else {
    this.$idleTimeStart = null;
  }
};

/**
 * @constructor The runner object that lives in the sandbox to run stuff.
 */
function Runner(timers) {
  this.timers = timers;
}

/**
 * @api
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
 * Propogate error up the call stack.
 * @param {object} e
 */
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

Runner.prototype.instantiate = function (genFn) {
  var o = Object.create(genFn.prototype);
  var args = Array.prototype.slice.call(arguments, 1);
  var gen = genFn.apply(o, args);
  var val = gen;
  if (isGen(gen)) {
    while (!(val = gen.next()).done);
    val = val.value;
  }
  if (val !== undefined) {
    return val;
  } else {
    return o;
  }
};

/**
 * @param {*} val
 * @return {boolean}
 */
function isGen(val) {
  return val && val.toString() === '[object Generator]';
}

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
 * @api
 * @param {*} val The value of the yield expression to pass to the generator.
 */
Runner.prototype.step = function (val) {
  this.timers.step();
  try {
    this.state = this.gen.next(val);
  } catch (e) {
    this.$propError(e);
    return;
  } finally {
    this.timers.stepEnd(
      this.state.done &&
      !isGen(this.state.value) &&
      !this.stack.length
    );
  }
  if (this.state.value && this.state.value instanceof Thunk) {
    this.stack.push(this.gen);
    this.gen = this.state.value.invoke();
    this.gen.type = 'thunk';
    this.step();
  } else if (this.state.value && this.state.value.type === 'stackFrame') {
    this.gen.stackFrame = this.state.value;
    this.step();
  } else if (this.state.done) {
    if (isGen(this.state.value)) {
      this.gen = this.state.value;
      this.gen.type = 'functionCall';
      this.state.done = false;
    } else if (this.stack.length) {
      this.gen = this.stack.pop();
      this.step(this.state.value);
    }
  }
};

/**
 * @api
 * @constructor
 * @param {object} sandbox An object with references to be copied into the context.
 * @param {object} options Optional arguments.
 */
function Machine(sandbox, options) {
  sandbox = sandbox || {};
  options = options || {};
  this.$anonFileId = 0;
  this.halted = false;
  this.paused = false;
  this.timers = new Timers();
  this.$runner = new Runner(this.timers);
  this.$evq = [];
  sandbox.__runner = this.$runner;
  sandbox.__thunk = createThunk;
  sandbox.__wrapListener = this.$wrapListener.bind(this);
  sandbox.__instantiate = this.$runner.instantiate.bind(this.$runner);
  sandbox.setTimeout = this.timers.setTimeout.bind(this.timers);
  sandbox.setInterval = this.timers.setInterval.bind(this.timers);
  sandbox.clearTimeout = this.timers.clearTimeout.bind(this.timers);
  sandbox.clearInterval = this.timers.clearInterval.bind(this.timers);
  sandbox.console = sandbox.console || console;
  this.context = new Context(sandbox, options.iframeParentElement);
  this.context.global = this.context.evaluate('this');
  this.$bootstrapRuntime();
  this.timers.on('timer', this.$onTimer.bind(this));
}

inherits(Machine, EventEmitter);

/**
 * @param {string} code
 * @returns {string} transformed code.
 */
Machine.prototype.$transform = function (code, filename) {
  var ast = recast.parse(code);
  filename = filename || ('file' + (++this.$anonFileId));
  var transformed = transform(ast, { filename: filename });
  if (!isGenSupported) {
    transformed = regenerator.transform(transformed);
  }
  return recast.print(transformed).code;
};

/**
 * @param {string} transformedCode
 * @return {Machine} this
 */
Machine.prototype.$evaluate = function(transformedCode) {
  this.context.evaluate(transformedCode);
  this.$setHalted(false);
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

  // TODO uncomment
  /*
  var arrayRuntime = fs.readFileSync(
    __dirname + '/../runtime/compiled/array.js'
  ).toString();
  this
    .$evaluate2(arrayRuntime)
    .run();
  */

  /*
  var domRuntime = fs.readFileSync(
    __dirname + '/../runtime/compiled/dom.js'
  ).toString();
  this
    .$evaluate(domRuntime)
    .run();
  */
};

/**
 * @param {string} type
 * @param {Generator} gen
 */
Machine.prototype.$setHalted = function (isHalted) {
  this.halted = !!isHalted;
  this.dispatchNextEvent();
};

/**
 * @param {string} type
 * @param {Generator} gen
 */
Machine.prototype.$enqueueEvent = function (type, gen, eventObj) {
  this.$evq.push({
    gen: gen,
    type: type,
    eventObj: eventObj
  });
  this.dispatchNextEvent();
};

/**
 * @param {object} timer
 */
Machine.prototype.$onTimer = function (timer) {
  this.$enqueueEvent(
    'timer',
    timer.genFn.apply(this.context.global, timer.args)
  );
};

/**
 * @param {Generator} gen
 */
Machine.prototype.$onEvent = function (gen, eventObj) {
  this.$enqueueEvent('event', gen, eventObj);
};

/**
 * @param {GenereatorFunction} genFn
 */
Machine.prototype.$wrapListener = function (genFn) {
  var dispatch = this.$onEvent.bind(this);
  return function (eventObj) {
    var gen = genFn.apply(this, arguments);
    // `__isPropagationStopped` set in runtime/dom.js
    if (isGen(gen)) {
      dispatch(gen, eventObj);
    } else {
      return gen;
    }
  };
};

/**
 * @api
 * @return {Machine}
 */
Machine.prototype.dispatchNextEvent = function () {
  if (this.halted && this.$evq.length) {
    var ev = this.$evq.shift();
    if (ev.type === 'event' && ev.eventObj &&
        ev.eventObj.__isPropagationStopped) {
      this.dispatchNextEvent();
      return;
    }
    this.$runner.init(ev.gen);
    this.halted = false;
    this.emit('event', ev.type);
  }
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Machine.prototype.pause = function () {
  this.paused = true;
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Machine.prototype.resume = function () {
  this.paused = false;
  return this;
};

/**
 * @api
 * @param {string} code
 * @return {Machine}
 */
Machine.prototype.evaluate = function (code, filename) {
  var transformed = this.$transform(code, filename);
  this.$evaluate(transformed);
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Machine.prototype.step = function () {
  try {
    this.$runner.step();
    this.$setHalted(this.$runner.state.done);
  } catch (e) {
    this.emit('error', e);
    this.$setHalted(true);
    return;
  }
  var state = this.$runner.state;
  // Update latest location on the current generator function.
  // @see this.getCurrentLoc()
  if (state.value && state.value.type === 'step') {
    this.$runner.gen.loc = {
      start: state.value.start,
      end: state.value.end
    };
  }
  if (state.value && state.value.type === 'debugger') {
    // When we hit a debugger statement, emit a debugger event, and if there
    // were no listeners then we recur, i.e. ignore. Otherwise we pause.
    if (this.emit('debugger', state.value)) {
      this.pause();
    } else {
      return this.step();
    }
  }
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Machine.prototype.run = function () {
  while (!this.halted && !this.paused) {
    this.step();
  }
  return this;
};

var _slice = Array.prototype.slice;
/**
 * Helper function to get the stackFrame representation from a generator object.
 * @return {object}
 */
Machine.prototype.$getStackFrame = function (gen) {
  if (gen.stackFrame) {
    // Clone object so we don't have data types from a another context.
    var scope = _slice.call(gen.stackFrame.scope)
    for (var i = 0; i < scope.length; i++) {
      var scopeObj = scope[i]
      scope[i] = {
        name: scopeObj.name,
        locs: _slice.call(scopeObj.locs)
      };
    }
    return {
      type: 'stackFrame',
      filename: gen.stackFrame.filename,
      name: gen.stackFrame.name,
      evalInScope: gen.stackFrame.evalInScope,
      scope: scope
    };
  } else if (gen.type === 'functionCall' || gen.type === 'thunk') {
    return {
      type: gen.type
    };
  } else {
    throw new Error('Unknown call type in stack: ' + gen.type);
  }
};

/**
 * @api
 * @return {array}
 */
Machine.prototype.getCallStack = function () {
  var stack = [this.$getStackFrame(this.$runner.gen)];
  for (var i = this.$runner.stack.length - 1; i >= 0; i--) {
    stack.unshift(this.$getStackFrame(this.$runner.stack[i]));
  }
  return stack;
};

/**
 * @api
 * @return {array}
 */
Machine.prototype.getCurrentStackFrame = function () {
  return this.$getStackFrame(this.$runner.gen);
};

/**
 * @api
 * @return {object}
 */
Machine.prototype.getState = function () {
  return this.$runner.state;
};

/**
 * @api
 * @return {object}
 */
Machine.prototype.getCurrentLoc = function () {
  var loc = this.$runner.gen.loc;
  if (loc) {
    return loc;
  }
  // Thunks don't have location information so when we are in thunks we'll just
  // look up the stack to get the first non-thunk location.
  var stack = this.$runner.stack;
  var i = stack.length - 1;
  while (!loc && i >= 0) {
    loc = stack[i].loc;
    i--;
  }
  return loc;
};

/**
 * A fast way to just get the filename.
 * @api
 * @return {string}
 */
Machine.prototype.getCurrentFilename = function () {
  if (this.$runner.gen.stackFrame) {
    return this.$runner.gen.stackFrame.filename;
  } else {
    var stack = this.$runner.stack;
    for (var i = stack.length - 1; i >= 0; i--) {
      if (stack[i].stackFrame) {
        return stack[i].stackFrame.filename;
      }
    }
  }
  throw new Error('Error getting filename');
};

module.exports = Machine;
