var Debugger = require('./lib/debugger');
var Machine = require('./lib/machine');

/**
 * Sugar to create a debugger without worrying about the machine.
 * @api
 * @param options
 */
function createDebugger(options) {
    options = options || {};
    return new Debugger(new Machine(options.sandbox, options));
}

module.exports = {
  Debugger: Debugger,
  Machine: Machine,
  createDebugger: createDebugger
};

