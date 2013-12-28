var recast = require('recast');
var transform = require('./transform');
var Context = require('context-eval');
var isGenSupported = require('./is_gen_supported');
var regenerator = require('regenerator');
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

function Machine(sandbox) {
  this.console = console;
  this.runner = new Runner();
  sandbox = sandbox || {};
  sandbox.__runner = this.runner;
  sandbox.__thunk = createThunk;
  sandbox.console = this.console;
  this.context = new Context(sandbox);
  this.$bootstrapRuntime();
}

Machine.prototype.$transform = function (code) {
  var ast = recast.parse(code);
  var transformed = transform(ast);
  var transformedCode = recast.print(transformed).code;
  if (!isGenSupported) {
    transformedCode = regenerator(transformedCode);
  }
  // console.log(transformedCode);
  return transformedCode;
};

Machine.prototype.$evaluate = function(transformedCode) {
  this.context.evaluate(transformedCode);
  this.context.evaluate('__runner.init(__top());');
  return this;
};

Machine.prototype.$bootstrapRuntime = function () {
  var regeneratorRuntime = fs.readFileSync(
    __dirname + '/../node_modules/regenerator/runtime/dev.js'
  ).toString();
  this.context.evaluate(regeneratorRuntime);

  var arrayRuntime = fs.readFileSync(
    __dirname + '/../runtime/compiled/array.js'
  ).toString();
  this
    .$evaluate(arrayRuntime)
    .run();
};

Machine.prototype.evaluate = function (code) {
  var transformed = this.$transform(code);
  this.$evaluate(transformed);
  return this;
};

Machine.prototype.step = function () {
  this.context.evaluate('__runner.step()');
  return this.runner.state;
};

Machine.prototype.run = function () {
  while (!this.runner.state.done) {
    this.step();
  }
};

module.exports = Machine;