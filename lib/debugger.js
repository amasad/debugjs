var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

function Debugger(machine) {
  this.machine = machine;
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

Debugger.prototype.run = function () {
  var machine = this.machine;
  while (!machine.halted) {
    machine.step();
    var val = machine.getState().value;
    if (val && val.type === 'step') {
      var stack = machine.getCallStack();
      var filename = stack[stack.length - 1].filename;
      var fileBp = this.$breakpoints[filename];
      if (fileBp && fileBp[val.start.line]) {
        this.breakpointData = {
          filename: filename,
          lineno: val.start.line,
          step: val,
          stack: stack
        };
        this.emit('breakpoint', this.breakpointData);
        return true;
      }
    }
  }
  return false;
};

Debugger.prototype.checkStarted = function () {
  if (!this.machine.getCurrentStackFrame()) {
    this.machine.step();
  }
};

Debugger.prototype.stepOver = function () {
  this.checkStarted();
  var frame = this.machine.getCurrentStackFrame();
  var curFrame;
  var done = false;
  do {
    this.machine.step();
    curFrame = this.machine.getCurrentStackFrame();
    done = this.machine.halted;
  } while (curFrame !== frame && !this.machine.halted);
};

Debugger.prototype.stepIn = function () {
  this.checkStarted();
  this.machine.step();
  var state = this.machine.getState();
  if (state.value && state.value.type === 'functionCall') {
    this.machine.step();
  }
};

Debugger.prototype.stepOut = function () {
  this.checkStarted();
  var stack = this.machine.getCallStack();
  var targetFrame = stack[stack.length - 2];
  while (this.machine.getCurrentStackFrame() !== targetFrame) {
    this.machine.step();
  }
};

module.exports = Debugger;