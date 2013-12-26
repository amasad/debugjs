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

Runner.prototype.handleThunk = function (thunk) {
  var genThunk;
  while(typeof thunk === 'function') {
    genThunk = thunk();
    var state = genThunk.next();
    if (!state.done) {
      this.stack.push(genThunk);
    }
    thunk = state.value;
  }
  return thunk;
};


Runner.prototype.step = function (val) {
  this.state = this.gen.next(val);

  if (typeof this.state.value === 'function') {

    // This is a thunk, we push current generator to the stack and recursively
    // evaluate (and push pending generators from the thunk in the call stack).
    this.stack.push(this.gen);
    var res = this.handleThunk(this.state.value);
    if (res && res.toString() === '[object Generator]') {
      // The result is a generator function call.
      this.gen = res;
    } else if (this.stack.length) {
      // The result is avalue.
      this.gen = this.stack.pop();
    }
  } else if (this.state.done) {
    if (this.state.value && this.state.value.toString() === '[object Generator]') {
      this.gen = this.state.value;
      this.state.done = false;
    } else if (this.stack.length) {
      this.gen = this.stack.pop();
      this.step(this.state.value);
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