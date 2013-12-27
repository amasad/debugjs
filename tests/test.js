var transform = require('../index');
var recast = require('recast');
var assert = require('assert');
var esprimaHarmony = require("esprima");
var _pp = require('jsonpretty');
var utils = require('./utils');

var fnString = utils.fnString;
var pp = function (json) {
  console.log(_pp(json));
};

function assertMsgFn(condition, msgFn) {
  if (!condition) {
    assert(false, msgFn());
  }
}

function assertEqualNodes(actual, expected) {
  for (var prop in actual) {
    if (typeof actual[prop] !== 'object') {
      assertMsgFn(
        expected,
        function () {
          return 'Expected node but found none corresponding to actual: ' +
                  recast.print(actual).code;
        }
      );
      assertMsgFn(
        actual[prop] === expected[prop],
        function () {
          return actual.type + ' ' + prop + ': ' + actual[prop] + ' != ' +
                  expected[prop] + '\n' +
                  'Actual node: ' + recast.print(actual).code + '\n' +
                  'Expected node: ' + recast.print(expected).code;
        }
      );
    }
  }
}

function parse(code) {
  return recast.parse(code, {esprima: esprimaHarmony});
}

function assertEqualsAST(actual, expected) {
  var path = [];
  recast.types.traverse(expected, function (n) {
    path.push(n);
  });
  var i = 0;
  recast.types.traverse(actual, function (n) {
    assertEqualNodes(n, path[i]);
    i++;
  });
}

describe('non functions', function () {

  it('should convert toplevel program into a toplevel generator', function () {
    var code = 'console.log(1);';
    var ast = transform(recast.parse(code));
    assert(ast.program.body[0].generator);
  });

  it('should yield before Statements', function () {
    var source = recast.parse(
      fnString(function () {
        console.log(1);
        2;
        var x = 1;
        if (x) {
          x = 2;
        }
        switch (x) {
          case 5:
            x;
            break;
        }
        while (x) {
          true;
          continue;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function *top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 15
              }
            };
            yield __thunk(function *thunk() {
              return console.log(1);
            });
          }
          {
            yield {
              "start": {
                "line": 2,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 2
              }
            };
            2;
          }
          {
            yield {
              "start": {
                "line": 3,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 10
              }
            };
            var x = 1;
          }
          {
            yield {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 1
              }
            };
            if (x) {
              {
                yield {
                  "start": {
                    "line": 5,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 6
                  }
                };
                x = 2;
              }
            }
          }
          {
            yield {
              "start": {
                "line": 7,
                "column": 0
              },

              "end": {
                "line": 11,
                "column": 1
              }
            };

            switch (x) {
            case 5:
              {
                yield {
                  "start": {
                    "line": 9,
                    "column": 0
                  },

                  "end": {
                    "line": 9,
                    "column": 2
                  }
                };

                x;
              }

              {
                yield {
                  "start": {
                    "line": 10,
                    "column": 0
                  },

                  "end": {
                    "line": 10,
                    "column": 6
                  }
                };

                break;
              }
            }
          }
          {
            yield {
              "start": {
                "line": 12,
                "column": 0
              },

              "end": {
                "line": 15,
                "column": 1
              }
            };

            while (x) {
              {
                yield {
                  "start": {
                    "line": 13,
                    "column": 0
                  },

                  "end": {
                    "line": 13,
                    "column": 5
                  }
                };

                true;
                {
                  yield {
                    "start": {
                      "line": 14,
                      "column": 0
                    },

                    "end": {
                      "line": 14,
                      "column": 9
                    }
                  };

                  continue;
                }
              }
            }
          }
        }
      })
    );

    assertEqualsAST(transform(source), expected);
  });

  it('should do right by for loops', function () {
    var source = parse(
      fnString(function () {
        for (var i = 0; i < 50; i++) {
          1;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 3,
                "column": 1
              }
            };

            for (var i = 0; i < 50; i++) {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 2
                  }
                };

                1;
              }
            }
          }
        }
      })
    );
    assertEqualsAST(transform(source), expected);
  });

  it('should do right by for in loops', function () {
    var source = parse(
      fnString(function () {
        for (var p in o) {
          1;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 3,
                "column": 1
              }
            };

            for (var p in o) {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 2
                  }
                };

                1;
              }
            }
          }
        }
      })
    );
    assertEqualsAST(transform(source), expected);
  });

  it('should do right by loops with complex expressions', function () {
    var source = parse(
      fnString(function () {
        for (var i = foo(), b = bar(); i < 50; i++) {
          1;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 3,
                "column": 1
              }
            };

            for (var i = yield __thunk(function* thunk() {
              return foo();
            }), b = yield __thunk(function* thunk() {
              return bar();
            }); i < 50; i++) {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 2
                  }
                };

                1;
              }
            }
          }
        }
      })
    );

    assertEqualsAST(transform(source), expected);
  });
});

describe('functions', function () {
  it('should convert function declerations to generators', function () {
    var source = parse(
      fnString(function () {
        function foo() {
          1;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 3,
                "column": 1
              }
            };

            function *foo() {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 2
                  }
                };

                1;
              }
            }
          }
        }
      })
    );

    assertEqualsAST(transform(source), expected);
  });

  it('should convert function expressions to generators', function () {
    var source = parse(
      fnString(function () {
        var foo = function () {
          1;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 3,
                "column": 1
              }
            };

            var foo = function* () {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 2
                  }
                };

                1;
              }
            }
          }
        }
      })
    );

    assertEqualsAST(transform(source), expected);
  });

  it('should *thunkify and yield function calls', function () {
    var source = parse(
      fnString(function () {
        function foo() {
          1;
        }
        foo();
      })
    );

    var expected = parse(
      fnString(function () {
        function*top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 3,
                "column": 1
              }
            };

            function *foo() {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 2
                  }
                };

                1;
              }
            }
          }
          {
            yield {
              "start": {
                "line": 4,
                "column": 0
              },

              "end": {
                "line": 4,
                "column": 6
              }
            };

            yield __thunk(function *thunk() {
              return foo();
            });
          }
        }
      })
    );

    assertEqualsAST(transform(source), expected);
  });

  it('should *thunkify and yield nested function calls', function () {
    var source = parse(
      fnString(function () {
        function bar() {
          function baz() {
            foo();
          }
          foo();
        }
        function foo() {
          bar();
        }
        foo();
      })
    );

    var expected = parse(
      fnString(function () {
        function* top() {
          {
            yield {
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 6,
                "column": 1
              }
            };

            function* bar() {
              {
                yield {
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 4,
                    "column": 1
                  }
                };

                function* baz() {
                  {
                    yield {
                      "start": {
                        "line": 3,
                        "column": 0
                      },

                      "end": {
                        "line": 3,
                        "column": 6
                      }
                    };

                    yield __thunk(function *thunk() {
                      return foo();
                    });
                  }
                }
              }

              {
                yield {
                  "start": {
                    "line": 5,
                    "column": 0
                  },

                  "end": {
                    "line": 5,
                    "column": 6
                  }
                };

                yield __thunk(function *thunk() {
                  return foo();
                });
              }
            }
          }

          {
            yield {
              "start": {
                "line": 7,
                "column": 0
              },

              "end": {
                "line": 9,
                "column": 1
              }
            };

            function* foo() {
              {
                yield {
                  "start": {
                    "line": 8,
                    "column": 0
                  },

                  "end": {
                    "line": 8,
                    "column": 6
                  }
                };

                yield __thunk(function *thunk() {
                  return bar();
                });
              }
            }
          }

          {
            yield {
              "start": {
                "line": 10,
                "column": 0
              },

              "end": {
                "line": 10,
                "column": 6
              }
            };

            yield __thunk(function *thunk() {
              return foo();
            });
          }
        }
      })
    );

    assertEqualsAST(transform(source), expected);
  });

});
