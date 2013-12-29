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
        this.emit('breakpoint', {
          filename: filename,
          lineno: val.start.line,
          step: val,
          stack: stack
        });
      }
    }
  }
};

Debugger.prototype.stepOver = function () {
};

Debugger.prototype.stepInto = function () {

};

Debugger.prototype.stepOut = function () {

};

module.exports = Debugger;