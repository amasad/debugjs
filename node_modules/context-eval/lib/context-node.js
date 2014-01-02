var vm = require('vm');

// ParentElement is only used in the browser but we want to came the same
// interface.
function Context(sandbox, parentElement) {
  this.context = vm.createContext(sandbox || {});
}

Context.prototype.evaluate = function (code) {
  return vm.runInContext(code, this.context);
};

Context.prototype.destroy = function () {
  this.context = null;
};

module.exports = Context;