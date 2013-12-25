var Machine = require('../machine');
var assert = require('assert');
var utils = require('./utils');

var fnString = utils.fnString;

describe('Machine#start', function () {

  it('should start the machine', function () {
    var machine = new Machine('1;\n2;');
    machine.start();
    assert.deepEqual(machine.runner.state, {
      value: null,
      done: false
    });
  });

});

describe('Machine#step', function () {

  it('should do a single step', function () {
    var machine = new Machine('1;\n2;');
    machine.start();
    machine.step();
    assert.deepEqual(machine.runner.state, {
      value: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      },
      done: false
    });
  });

  it('should do multiple steps', function () {
    var machine = new Machine('1;\n2;\n3;');
    machine.start();
    machine.step();
    assert.deepEqual(machine.runner.state, {
      value: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      },
      done: false
    });
    machine.step();
    assert.deepEqual(machine.runner.state, {
      value: {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 2,
          column: 2
        }
      },
      done: false
    });
  });

  it('should step to completion', function () {
    var machine = new Machine('1;\n2;\n3;');
    machine.start();
    var i = 0;
    var done = false;
    while (!done) {
      var done = machine.step().done;
      i++;
    }
    assert.equal(i, 4);
  });

  it('should step through functions', function (done) {
    var machine = new Machine('foo()', {
      foo: function () {
        done();
      }
    });
    machine.start();
    machine.step();
    machine.step();
  });

  it('should handle call stack', function (done) {
    var source = fnString(function () {
      function foo() {
        bar(0);
      }
      foo();
      bar(1);
    });

    var i = 0;
    var machine = new Machine(source, {
      bar: function (arg) {
        assert.equal(arg, i);
        if (i === 1) {
          done();
        }
        i++;
      }
    });

    machine.start();
    // function foo()
    machine.step();
    // foo()
    machine.step();
    // call foo
    machine.step();
    // bar(0)
    machine.step();
    // call bar 0
    machine.step();
    // end foo
    machine.step();
    // bar(1)
    machine.step();
    // call bar 1
    machine.step();
    // end
    machine.step();

    assert(machine.runner.state.done);
  });

  // it('should run in sandbox', function (done) {
  //   var i = 0;
  //   var machine = new Machine('testOuts("foo");', {
  //     testOut: function (arg) {
  //       console.log(arg)
  //       if (i == 0) {
  //         assert.equal(arg === 'foo');
  //       } else {
  //         assert.eqaul(arg === 1);
  //         done();
  //       }
  //       i++;
  //     }
  //   });
  //   machine.start();
  //   machine.step();
  //   machine.step();
  // });

});

describe('Machine#run', function () {

  it('should step to completion', function () {
    var machine = new Machine('1;\n2;\n3;');
    machine.start();
    machine.run();
  });

});
