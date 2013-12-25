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

Runner.prototype.step = function (val) {
  this.state = this.gen.next(val);
  if (typeof this.state.value === 'function') {

    // This is a thunk evaluate it and if the result is a generator then we
    // have to push it on the call stack.
    var res = this.state.value();
    if (res && res.toString() === '[object Generator]') {
      this.stack.push(this.gen);
      this.gen = res;
    }
  } else if (this.state.done) {

    // We are done, but are we really? we could have other generators (calls)
    // in the call stack. pop them off and run the result through the step to
    // send it back to the yeilder.
    if (this.stack.length) {
      this.gen = this.stack.pop();
      this.step(this.state.value);
      this.state.done = false;
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
  sandbox.console = this.console;
  this.context = vm.createContext(sandbox);
}


Machine.prototype.start = function () {
  vm.runInContext(this.transformedCode, this.context);
  vm.runInContext('runner.init(top());', this.context);
  return this;
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