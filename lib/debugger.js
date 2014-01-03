var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

function Debugger(machine) {
  this.machine = machine;
  machine.on('debugger', this.$machineDebuggerHandler.bind(this));
  this.$breakpoints = {};
  EventEmitter.call(this);
}

inherits(Debugger, EventEmitter);

Debugger.prototype.getBreakpoints = function (filename) {
  return this.$breakpoints[filename];
};

Debugger.prototype.addBreakpoints = function (filename, linenos) {
  if (!this.$breakpoints[filename]) {
    this.$breakpoints[filename] = {};
  }
  linenos.forEach(function (lineno) {
    this.$breakpoints[filename][lineno] = true;
  }, this);
};

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
  var stack = this.machine.getCallStack();
  var filename = stack[stack.length - 1].filename;
  this.$breakpointHandler({
    filename: filename,
    lineno: step.start.line,
    step: step,
    stack: stack
  });
};

Debugger.prototype.$breakpointHandler = function (data) {
    this.breakpointData = data;
    this.emit('breakpoint', this.breakpointData);
    this.machine.pause();
};

Debugger.prototype.$step = function () {
  this.machine.step();
  var val = this.machine.getState().value;
  if (val && val.type === 'step') {
    var stack = this.machine.getCallStack();
    var filename = stack[stack.length - 1].filename;
    var fileBp = this.$breakpoints[filename];
    if (fileBp && fileBp[val.start.line]) {
      this.$breakpointHandler({
        filename: filename,
        lineno: val.start.line,
        step: val,
        stack: stack
      });
    }
  }
};

Debugger.prototype.$checkStarted = function () {
  if (!this.machine.getCurrentStackFrame()) {
    this.machine.step();
  }
  this.machine.resume();
};

Debugger.prototype.run = function () {
  this.$checkStarted();
  var machine = this.machine;
  while (!machine.halted && !machine.paused) {
    this.$step();
  }
  return this;
};

Debugger.prototype.stepOver = function () {
  this.$checkStarted();
  var machine = this.machine;
  var len = this.machine.getCallStack().length;
  do {
    this.$step();
  } while ((this.machine.getCallStack().length > len) &&
            !machine.halted &&
            !machine.paused);
};

Debugger.prototype.stepIn = function () {
  this.$checkStarted();
  this.machine.step();
  var state = this.machine.getState();
  if (state.value && state.value.type === 'functionCall') {
    this.machine.step();
  }
};

Debugger.prototype.stepOut = function () {
  this.$checkStarted();
  var machine = this.machine;
  var len = this.machine.getCallStack().length - 1;
  while (this.machine.getCallStack().length > len &&
          !machine.paused && !machine.halted) {
    this.$step();
  }
};

Debugger.prototype.load = function (code, filename) {
  this.machine.evaluate(code, filename);
};

module.exports = Debugger;
