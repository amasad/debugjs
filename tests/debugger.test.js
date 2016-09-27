var Machine = require('../lib/machine');
var Debugger = require('../lib/debugger');
var fnString = require('../tests/utils').fnString;
var assert = require('assert');

describe('Debugger#addBreakpoints', function () {

  var machine = new Machine();

  it('should add breakpoints to file', function () {
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [1, 2, 3]);
    assert.deepEqual(debuggr.getBreakpoints('foo'), {1: true, 2: true, 3: true});
  });

});

describe('Debugger#removeBreakpoints', function () {
  var machine = new Machine();

  it('should remove some breakpoints from file', function () {
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [1, 2, 3]);
    debuggr.removeBreakpoints('foo', [3]);
    assert.deepEqual(debuggr.getBreakpoints('foo'), {1: true, 2: true, 3: null});
  });

  it('should remove all breakpoints from file', function () {
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [1, 2, 3]);
    debuggr.removeBreakpoints('foo');
    assert.equal(debuggr.getBreakpoints('foo'), null);
  });

});

describe('Debugger#run', function () {

  it('should run code without breakpoints', function () {
    var reported = false;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, 1);
        reported = true;
      }
    });

    var debuggr = new Debugger(machine);
    machine.evaluate('1;\nreport(1);');

    debuggr.run();
    assert(reported);
    assert(machine.halted);
  });

  it('should break on breakpoints', function (done) {
    var reported = false;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, 2);
        reported = true;
      }
    });

    var debuggr = new Debugger(machine);
    machine.evaluate('1;\nreport(2);\n3;\n4;', 'fooFile');

    debuggr.on('breakpoint', function (data) {
      // remove any function refs:
      data = JSON.parse(JSON.stringify(data));
      assert.deepEqual(data, {
        filename: 'fooFile',
        lineno: 3,
        step: {
          type: 'step',
          start: {
            line: 3,
            column: 0
          },
          end: {
            line: 3,
            column: 2
          }
        },
        stack: [{
          type: 'stackFrame',
          filename: 'fooFile',
          name: 'Global Scope',
          scope: []
        }]
      });
      assert(reported);
      assert(!machine.halted);

      done();
    });

    debuggr.addBreakpoints('fooFile', [3]);
    debuggr.run();
  });


 it('should break on breakpoint and continue', function () {
    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });

    var debuggr = new Debugger(machine);
    machine.evaluate('1;\nreport(1);\n3;\nreport(2);', 'fooFile');

    debuggr.addBreakpoints('fooFile', [3]);
    var stopped = debuggr.run();
    assert(stopped);
    var data = JSON.parse(JSON.stringify(debuggr.breakpointData));
    assert.deepEqual(data, {
      filename: 'fooFile',
      lineno: 3,
      step: {
        type: 'step',
        start: {
          line: 3,
          column: 0
        },
        end: {
          line: 3,
          column: 2
        }
      },
      stack: [{
        type: 'stackFrame',
        filename: 'fooFile',
        name: 'Global Scope',
        scope: []
      }]
    });

    debuggr.run();
    assert(machine.halted);
    assert.equal(i, 2);
  });

 it('should break and continue on multiple files', function () {
    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    var debuggr = new Debugger(machine);
    var fooFile = fnString(function () {
      report(1);
      bar();
    });
    var barFile = fnString(function () {
      function bar() {
        1;
        report(2);
      }
      this.bar = bar;
    });

    machine.evaluate(barFile, 'barFile').run();
    machine.evaluate(fooFile, 'fooFile');
    debuggr.addBreakpoints('barFile', [2]);
    var stopped = debuggr.run();
    console.log('debuggr.breakpointData', debuggr.breakpointData);
    var data = JSON.parse(JSON.stringify(debuggr.breakpointData));
    assert.deepEqual(data, {
      filename: 'barFile',
      lineno: 2,
      step: {
        type: 'step',
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 2,
          column: 2
        }
      },
      stack: [{
        type: 'stackFrame',
        filename: 'fooFile',
        name: 'Global Scope',
        scope: []
      }, {
        type: 'stackFrame',
        filename: 'barFile',
        name: 'bar',
        scope: []
      }]
    });
  });


  it('should break on first line', function () {
    var source = fnString(function () {
      report(1);
      report(2);
      report('never');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    machine.evaluate(source, 'foo');
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [1]);
    debuggr.run();
    assert.equal(i, 0);
  });

});

describe('Debugger#stepOver', function () {

  it('should step over function calls', function (done) {
    var source = fnString(function () {
      function foo() {
        report('foo');
      }
      foo();
      report('done');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        if (!i) {
          assert.equal(arg, 'foo');
        } else {
          assert.equal(arg, 'done');
          done();
        }
        i++;
      }
    });
    machine.evaluate(source);
    var debuggr = new Debugger(machine);
    debuggr.machine.step();
    // function foo
    debuggr.stepOver();
    // foo()
    debuggr.stepOver();
    // report()
    debuggr.stepOver();

    // Make sure it steps until it's halted.
    while (!machine.halted) {
      debuggr.stepOver();
    }
  });

  it('should handle breakpoints while steping over', function () {
    var source = fnString(function () {
      function foo() {
        report(1);
        report(2);
        report(3);
      }
      foo();
      report(4);
      report('will never happen');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    machine.evaluate(source, 'foo');
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [4]);
    debuggr.machine.step();
    // function foo
    debuggr.stepOver();
    // foo ()
    debuggr.stepOver();
    // Paused on 3
    assert.equal(i, 2);
  });

  it('should step out when the function ends', function () {
    var source = fnString(function () {
      function foo() {
        report(1);
        report(2);
        report(3);
      }
      foo();
      report(4);
      report('will never happen');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    machine.evaluate(source, 'foo');
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [4]);
    debuggr.machine.step();
    // function foo
    debuggr.stepOver();
    // foo ()
    debuggr.stepOver();
    // report(3)
    debuggr.stepOver();
    // report(4)
    debuggr.stepOver();
    assert.equal(i, 4);
  });

});

describe('Debugger#stepIn', function () {

  it('should step into function calls', function () {
    var source = fnString(function () {
      function foo() {
        report('foo');
      }
      foo();
    });

    var called = false;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, 'foo');
        called = true;
      }
    });
    machine.evaluate(source);
    var debuggr = new Debugger(machine);
    debuggr.machine.step();
    // function foo
    debuggr.stepIn();
    // foo ()
    debuggr.stepIn();
    // report('foo')
    debuggr.stepIn();
    assert(called);

    // Make sure it steps until it's halted.
    while (!machine.halted) {
      debuggr.stepIn();
    }
  });

});


describe('Debugger#stepOut', function () {

  it('should step out of function calls', function () {
    var source = fnString(function () {
      function foo() {
        report(1);
        report(2);
        report(3);
      }
      foo();
      report(4);
      report('will never happen');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    machine.evaluate(source);
    var debuggr = new Debugger(machine);
    debuggr.machine.step();
    // function foo
    debuggr.stepOver();
    // foo ()
    debuggr.stepIn();
    // report(1)
    debuggr.stepOver();
    // report(2)
    debuggr.stepOut();
    // report(4)
    debuggr.stepOver();
    assert.equal(i, 4);
  });

  it('should handle breakpoints while steping out', function () {
    var source = fnString(function () {
      function foo() {
        report(1);
        report(2);
        report(3);
      }
      foo();
      report(4);
      report('will never happen');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    machine.evaluate(source, 'foo');
    var debuggr = new Debugger(machine);
    debuggr.addBreakpoints('foo', [4]);
    debuggr.machine.step();
    // function foo
    debuggr.stepOver();
    // foo ()
    debuggr.stepIn();
    // report(1)
    debuggr.stepOver();
    // report(2)
    debuggr.stepOut();
    // Paused on 3
    assert.equal(i, 2);
  });

  it('should stepin and out functions within the same statment', function () {
    var source = fnString(function () {
      function foo() {
        (function () {
          2;
        })();
        report(1);
        return true;
      }
      function bar() {
        report(2);
        return true;
      }
      function baz() {
        report(3);
        (function () {
          1;
        })();
        return true;
      }
      foo() && bar() && baz();
      report('will never happen');
    });

    var i = 0;
    var machine = new Machine({
      report: function (arg) {
        assert.equal(arg, ++i);
      }
    });
    machine.evaluate(source, 'foo');
    var debuggr = new Debugger(machine);
    debuggr.machine.step();
    // function foo
    debuggr.stepOver();
    // function bar
    debuggr.stepOver();
    // function baz
    debuggr.stepOver();
    // foo() && bar() && baz()
    debuggr.stepIn();
    debuggr.stepOut();
    assert.equal(i, 1);
    // foo() && bar() && baz()
    debuggr.stepIn();
    debuggr.stepOut();
    assert.equal(i, 2);
    // foo() && bar() && baz()
    debuggr.stepOver();
    assert.equal(i, 3);
  });

});


describe('debugger statement', function () {
  it('should pause and emit on debugger statement', function (done) {
    var source = fnString(function () {
      report(1);
      debugger;
      report(2);
    });

    var machine = new Machine({
      report: function (arg) {
        assert.equal(1, arg);
      }
    });

    machine.evaluate(source, 'fooFile');
    var debuggr = new Debugger(machine);
    debuggr.on('breakpoint', function (data) {
      data = JSON.parse(JSON.stringify(data));
      assert.deepEqual(data, {
        filename: 'fooFile',
        lineno: 2,
        step: {
          type: 'debugger',
          start: {
            line: 2,
            column: 0
          },
          end: {
            line: 2,
            column: 9
          }
        },
        stack: [{
          type: 'stackFrame',
          filename: 'fooFile',
          name: 'Global Scope',
          scope: []
        }]
      });
      done();
    });

    debuggr.run();
    assert(machine.paused);
  });

});
