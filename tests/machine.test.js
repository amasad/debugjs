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

  it('should step through functions in sandbox', function (done) {
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

});

describe('Machine#run', function () {

  it('should run to completion', function () {
    var machine = new Machine('1;\n2;\n3;');
    machine.start();
    machine.run();
  });

  it('should nested function calls', function (done) {
    var source = fnString(function () {
      function foo0() {
        report('foo0');
      }

      function foo1() {
        report('foo1');
        foo2();
        foo0();
      }
      function foo2() {
        report('foo2');
        foo3()
      }
      function foo3() {
        report('foo3');
      }
      foo1();
      report('done');
    });

    var i = 0;
    var machine = new Machine(source, {
      report: function (arg) {
        var expected;
        switch (i) {
          case 0:
            expected = 'foo1';
            break;
          case 1:
            expected = 'foo2';
            break;
          case 2:
            expected = 'foo3';
            break;
          case 3:
            expected = 'foo0';
            break;
          case 4:
            expected = 'done';
            break;
        }
        assert.equal(arg, expected);
        i++;
        if (i > 4) {
          done();
        }
      }
    });

    machine.start().run();
  });

  it('should nested function delcerations and calls', function (done) {
    var source = fnString(function () {
      function foo1() {
        function foo2() {
          function foo3() {
            report(3);
          }
          report(2);
          foo3();
        }
        report(1);
        foo2();
      }
      foo1();
      report('done');
    });

    var i = 0;
    var machine = new Machine(source, {
      report: function (arg) {
        var expected;
        switch (i) {
          case 0:
            expected = 1;
            break;
          case 1:
            expected = 2;
            break;
          case 2:
            expected = 3;
            break;
          case 3:
            expected = 'done';
            break;
        }
        assert.equal(arg, expected);
        i++;
        if (i > 3) {
          done();
        }
      }
    });

    machine.start().run();
  });

});
