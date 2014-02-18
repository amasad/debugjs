var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

/**
 * @constructor
 * @param {Machine} machine
 */
function Debugger(machine) {
  this.machine = machine;
  machine.on('debugger', this.$machineDebuggerHandler.bind(this));
  machine.on('event', this.run.bind(this));
  this.$breakpoints = {};
  EventEmitter.call(this);
}

inherits(Debugger, EventEmitter);

/**
 * @api
 * @param {string} filename
 * @return {array}
 */
Debugger.prototype.getBreakpoints = function (filename) {
  return this.$breakpoints[filename];
};

/**
 * @api
 * @param {string} filename
 * @param {array<number>} linenos
 * @return {Machine}
 */
Debugger.prototype.addBreakpoints = function (filename, linenos) {
  if (!this.$breakpoints[filename]) {
    this.$breakpoints[filename] = {};
  }
  linenos.forEach(function (lineno) {
    this.$breakpoints[filename][lineno] = true;
  }, this);
  return this;
};

/**
 * @api
 * @param {string} filename
 * @param {array<number>} linenos
 * @return {Machine}
 */
Debugger.prototype.removeBreakpoints = function (filename, linenos) {
  if (!linenos) {
    this.$breakpoints[filename] = null;
  } else {
    linenos.forEach(function (lineno) {
      var fileBp = this.$breakpoints[filename];
      if (fileBp) {
        fileBp[lineno] = null;
      }
    }, this);
  }
};

Debugger.prototype.$machineDebuggerHandler = function (step) {
  var stack = this.getCallStack();
  var filename = stack[stack.length - 1].filename;
  this.$breakpointHandler({
    filename: filename,
    lineno: step.start.line,
    step: step,
    stack: stack
  });
};

Debugger.prototype.$pauseIfNotHalted = function () {
  if (!this.machine.halted) {
    this.machine.pause();
  }
};

Debugger.prototype.$breakpointHandler = function (data) {
    this.breakpointData = data;
    this.machine.pause();
    this.emit('breakpoint', this.breakpointData);
};

Debugger.prototype.$step = function () {
  this.machine.step();
  var val = this.machine.getState().value;
  if (val && val.type === 'step') {
    var filename = this.machine.getCurrentFilename();
    var fileBp = this.$breakpoints[filename];
    if (fileBp && fileBp[val.start.line]) {
      this.$breakpointHandler({
        filename: filename,
        lineno: val.start.line,
        step: val,
        stack: this.getCallStack()
      });
    }
  }
};


/**
 * @api
 * @param {object} options
 */
Debugger.prototype.getCallStack = function (options) {
  options = options || {};
  if (!options.raw) {
    // Most end users will probably just want the function call stack without
    // all the system stuff.
    return this.machine.getCallStack().filter(function (frame) {
      if (frame.type !== 'stackFrame') {
        return false;
      } else {
        return true;
      }
    });
  } else {
    return this.machine.getCallStack();
  }
};

/**
 * @api
 * @param {object} options
 */
Debugger.prototype.run = function () {
  this.machine.resume();
  var machine = this.machine;
  while (!machine.halted && !machine.paused) {
    this.$step();
  }
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Debugger.prototype.stepOver = function () {
  this.machine.resume();
  var machine = this.machine;
  var len = this.getCallStack({ raw: true }).length;
  var state = machine.getState();
  if (state.value && state.value.type === 'functionCall') {
    // If we are in a thunk (a function that hasn't been called yet) we ignore
    // it and step over.
    len -= 1;
  }
  do {
    this.$step();
  } while ((this.getCallStack({ raw: true }).length > len) &&
            !machine.halted &&
            !machine.paused);
  this.$pauseIfNotHalted();
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Debugger.prototype.stepIn = function () {
  this.machine.resume();
  this.machine.step();
  var state = this.machine.getState();
  if (state.value && state.value.type === 'functionCall') {
    this.machine.step();
  }
  this.$pauseIfNotHalted();
  return this;
};

Debugger.prototype.$stepOutCondition = function (len) {
  var machine = this.machine;
  var state = machine.getState();
  var curLen = this.getCallStack({ raw: true }).length;
  return curLen > len &&
    // This is testing whether we jumped into a new function call without
    // stepping out of our thunk stack frame. Could happen in an expression
    // statement with two function calls.
    !((curLen === len + 1) &&
      state.value && state.value.type === 'functionCall') &&
    !machine.paused && !machine.halted;
};

/**
 * @api
 * @return {Machine}
 */
Debugger.prototype.stepOut = function () {
  this.machine.resume();
  var len = this.getCallStack({ raw: true }).length - 1;
  while (this.$stepOutCondition(len)) {
    this.$step();
  }
  this.$pauseIfNotHalted();
  return this;
};

/**
 * @api
 * @return {Machine}
 */
Debugger.prototype.load = function (code, filename) {
  this.machine.evaluate(code, filename);
  return this;
};

Debugger.prototype.paused = function () {
  return this.machine.paused;
};

Debugger.prototype.halted = function () {
  return this.machine.halted;
};

Debugger.prototype.getCurrentLoc = function () {
  return this.machine.getCurrentLoc();
};

Debugger.prototype.getContext = function () {
  return this.machine.context;
};

Debugger.prototype.getCurrentStackFrame = function () {
  var stack = this.getCallStack();
  return stack[stack.length - 1];
};

module.exports = Debugger;
