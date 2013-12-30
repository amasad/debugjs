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

Debugger.prototype.$step = function () {
  this.machine.step();
  var val = this.machine.getState().value;
  if (val && val.type === 'step') {
    var stack = this.machine.getCallStack();
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
      this.machine.pause();
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
  var frame = this.machine.getCurrentStackFrame();
  var curFrame;
  do {
    this.$step();
    curFrame = machine.getCurrentStackFrame();
  } while (curFrame !== frame && !machine.halted && !machine.paused);
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
  var stack = this.machine.getCallStack();
  var targetFrame = stack[stack.length - 2];
  while (this.machine.getCurrentStackFrame() !== targetFrame &&
          !machine.paused && !machine.halted) {
    this.$step();
  }
};

module.exports = Debugger;
