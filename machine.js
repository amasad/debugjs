var recast = require('recast');
var transform = require('./index');
var vm = require('vm');

function Runner() {}

Runner.prototype.init = function (gen) {
  this.gen = gen;
  this.stack = [];
  this.state = {
    value: null,
    done: false
  };
};

Runner.prototype.step = function () {
  this.state = this.gen.next();
  if (typeof this.state.value === 'function') {
    var res = this.state.value();
    if (res && res.toString() === '[object Generator]') {
      this.stack.push(this.gen);
      this.gen = res;
    }
  }
};

function Machine(code, sandbox) {
  this.code = code;
  this.ast = recast.parse(code);
  this.transformed = transform(this.ast);
  this.transformedCode = recast.print(this.transformed).code;
  this.console = console;
  this.runner = new Runner();
  sandbox = sandbox || {};
  sandbox.runner = this.runner;
  this.context = vm.createContext(sandbox);
}


Machine.prototype.start = function () {
  vm.runInContext(this.transformedCode, this.context);
  vm.runInContext('runner.init(top());', this.context);
};

Machine.prototype.step = function () {
  vm.runInContext('runner.step()', this.context);
  return this.runner.state;
};

Machine.prototype.run = function () {
  while (!this.runner.state.done) {
    this.step();
  }
};

module.exports = Machine;