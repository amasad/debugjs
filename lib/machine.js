var recast = require('recast');
var transform = require('./transform');
var vm = require('vm');
var fs = require('fs');

function Thunk(fn, thisp) {
  this.fn = fn;
  this.thisp = thisp;
}

Thunk.prototype.invoke = function () {
  return this.fn.call(this.thisp);
};

function createThunk(fn, thisp) {
  return new Thunk(fn, thisp);
}

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
  // TODO add thunk type.
  if (this.state.value && this.state.value instanceof Thunk) {
    this.stack.push(this.gen);
    this.gen = this.state.value.invoke();
    this.step();
  } else if (this.state.done) {
    if (this.state.value &&
        this.state.value.toString() === '[object Generator]') {
      this.gen = this.state.value;
      this.state.done = false;
    } else if (this.stack.length) {
      this.gen = this.stack.pop();
      this.step(this.state.value);
    }
  }
};

// var m = new Machine({ console: console });
function Machine(sandbox) {
  this.console = console;
  this.runner = new Runner();
  sandbox = sandbox || {};
  sandbox.__runner = this.runner;
  sandbox.__thunk = createThunk;
  sandbox.console = this.console;
  this.context = vm.createContext(sandbox);
  this.$bootstrapRuntime();
}

Machine.prototype.$transform = function (code) {
  var ast = recast.parse(code);
  var transformed = transform(ast);
  var transformedCode = recast.print(transformed).code;
  // console.log(transformedCode);
  return transformedCode;
};

Machine.prototype.$evaluate = function(transformedCode) {
  vm.runInContext(transformedCode, this.context);
  vm.runInContext('__runner.init(top());', this.context);
  return this;
};

Machine.prototype.$bootstrapRuntime = function () {
 var runtime = fs.readFileSync('runtime/es5.compiled.js').toString();
 this
    .$evaluate(runtime)
    .run();
};

Machine.prototype.evaluate = function (code) {
  var transformed = this.$transform(code);
  this.$evaluate(transformed);
  return this;
};

Machine.prototype.step = function () {
  vm.runInContext('__runner.step()', this.context);
  return this.runner.state;
};

Machine.prototype.run = function () {
  while (!this.runner.state.done) {
    this.step();
  }
};

module.exports = Machine;