var vm = require('vm');

function Context(sandbox) {
  this.context = vm.createContext(sandbox || {});
}

Context.prototype.evaluate = function (code) {
  return vm.runInContext(code, this.context);
};

Context.prototype.destroy = function () {
  this.context = null;
};

module.exports = Context;