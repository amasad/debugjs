var Debugger = require('./lib/debugger');
var Machine = require('./lib/machine');

window.debugjs = {
  Debugger: Debugger,
  Machine: Machine,
  createDebugger: function (options) {
    options = options || {};
    return new Debugger(new Machine(options.sandbox, options));
  }
};
