var Machine = require('../lib/machine');
var Debugger = require('../lib/debugger');
var assert = require('assert');

describe('Debugger#addBreakpoints', function () {

  it('should add breakpoints to file', function () {
    var debuggr = new Debugger({});
    debuggr.addBreakpoints('foo', [1, 2, 3]);
    assert.deepEqual(debuggr.getBreakpoints('foo'), {1: true, 2: true, 3: true});
  });

});

describe('Debugger#removeBreakpoints', function () {

  it('should remove some breakpoints from file', function () {
    var debuggr = new Debugger({});
    debuggr.addBreakpoints('foo', [1, 2, 3]);
    debuggr.removeBreakpoints('foo', [3]);
    assert.deepEqual(debuggr.getBreakpoints('foo'), {1: true, 2: true, 3: null});
  });

  it('should remove all breakpoints from file', function () {
    var debuggr = new Debugger({});
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


//  it('should break on breakpoint and continue', function (done) {
//     var i = 0;
//     var machine = new Machine({
//       report: function (arg) {
//         assert.equal(arg, ++i);
//       }
//     });

//     var debuggr = new Debugger(machine);
//     machine.evaluate('1;\nreport(1);\n3;\nreport(2);', 'fooFile');

//     debuggr.on('breakpoint', function (data) {
      
//     });

//     debuggr.addBreakpoints('fooFile', [3]);
//     debuggr.run();
//   });

});
