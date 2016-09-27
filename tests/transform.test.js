var transform = require('../lib/transform');
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
    if (prop === 'async') continue;
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
    var ast = transform(recast.parse(code), { filename: 'testFile' });
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
      })
    );

    var expected = parse(
      fnString(function () {
        function *__top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",
            "scope": [{
              "name": "x",
              "locs": [{
                  "start": {
                      "line": 3,
                      "column": 4
                  },

                  "end": {
                      "line": 3,
                      "column": 5
                  }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
            }, this, arguments);
          }
          {
            yield {
              "type": "step",
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
              "type": "step",
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
              "type": "step",
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
                  "type": "step",
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
              "type": "step",
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
                  "type": "step",
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
                  "type": "step",
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
        }
      })
    );

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
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
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",
            "scope": [{
              "name": "i",
              "locs": [{
                  "start": {
                      "line": 1,
                      "column": 9
                  },
                  "end": {
                      "line": 1,
                      "column": 10
                  }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
                {
                  yield {
                    "type": "step",
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

              yield {
                "type": "step",
                "start": {
                  "line": 1,
                  "column": 0
                },

                "end": {
                  "line": 3,
                  "column": 1
                }
              };
            }
          }
        }
      })
    );
    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
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
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",
            "scope": [{
              "name": "p",
              "locs": [{
                  "start": {
                      "line": 1,
                      "column": 9
                  },

                  "end": {
                      "line": 1,
                      "column": 10
                  }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
                {
                  yield {
                    "type": "step",
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

                yield {
                  "type": "step",
                  "start": {
                    "line": 1,
                    "column": 0
                  },

                  "end": {
                    "line": 3,
                    "column": 1
                  }
                };
              }

            }
          }
        }
      })
    );
    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
  });

  it('should do right by loops with complex expressions', function () {
    var source = parse(
      fnString(function () {
        for (var i = foo(), b = bar(); i < 50; i++) {
          1;
          2;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",

            "scope": [{
              "name": "i",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 9
                },

                "end": {
                  "line": 1,
                  "column": 10
                }
              }]
            }, {
              "name": "b",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 20
                },

                "end": {
                  "line": 1,
                  "column": 21
                }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 4,
                "column": 1
              }
            };

            for (var i = yield __thunk(function* thunk() {
              return foo();
            }, this, arguments), b = yield __thunk(function* thunk() {
              return bar();
            }, this, arguments); i < 50; i++) {
              {
                {
                  yield {
                    "type": "step",
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

                {
                  yield {
                    "type": "step",
                    "start": {
                      "line": 3,
                      "column": 0
                    },

                    "end": {
                      "line": 3,
                      "column": 2
                    }
                  };

                  2;
                }
              }

              yield {
                "type": "step",
                "start": {
                  "line": 1,
                  "column": 0
                },

                "end": {
                  "line": 4,
                  "column": 1
                }
              };
            }
          }
        }
      })
    );

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
  });

  it('should work with while loops', function () {
    var source = parse(
      fnString(function () {
        while (x) {
          true;
          continue;
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",
            "scope": [],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 4,
                "column": 1
              }
            };

            while (x) {
              {
                {
                  yield {
                    "type": "step",
                    "start": {
                      "line": 2,
                      "column": 0
                    },

                    "end": {
                      "line": 2,
                      "column": 5
                    }
                  };

                  true;
                }

                {
                  yield {
                    "type": "step",
                    "start": {
                      "line": 3,
                      "column": 0
                    },

                    "end": {
                      "line": 3,
                      "column": 9
                    }
                  };

                  continue;
                }
              }

              yield {
                "type": "step",
                "start": {
                  "line": 1,
                  "column": 0
                },

                "end": {
                  "line": 4,
                  "column": 1
                }
              };
            }
          }
        }
      })
    );

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
  });
});

describe('functions', function () {
  it('should add a stack frame step to functions', function () {
    var source = parse(
      fnString(function () {
        function foo() {
          var x = 1;
          function y() {}
        }
      })
    );

    var expected = parse(
      fnString(function () {
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",

            "scope": [{
              "name": "foo",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 9
                },

                "end": {
                  "line": 1,
                  "column": 12
                }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
              "start": {
                "line": 1,
                "column": 0
              },

              "end": {
                "line": 4,
                "column": 1
              }
            };

            function* foo() {
              yield {
                "type": "stackFrame",
                "filename": "testFile",
                "name": "foo",

                "scope": [{
                  "name": "x",

                  "locs": [{
                    "start": {
                      "line": 2,
                      "column": 4
                    },

                    "end": {
                      "line": 2,
                      "column": 5
                    }
                  }]
                }, {
                  "name": "y",

                  "locs": [{
                    "start": {
                      "line": 3,
                      "column": 9
                    },

                    "end": {
                      "line": 3,
                      "column": 10
                    }
                  }]
                }],
                "evalInScope": function (expr) {
                  return eval(expr);
                }
              };

              {
                yield {
                  "type": "step",
                  "start": {
                    "line": 2,
                    "column": 0
                  },

                  "end": {
                    "line": 2,
                    "column": 10
                  }
                };

                var x = 1;
              }

              {
                yield {
                  "type": "step",
                  "start": {
                    "line": 3,
                    "column": 0
                  },

                  "end": {
                    "line": 3,
                    "column": 15
                  }
                };

                function* y() {
                  yield {
                    "type": "stackFrame",
                    "filename": "testFile",
                    "name": "y",
                    "scope": [],
                    "evalInScope": function (expr) {
                      return eval(expr);
                    }
                  };

                  {}
                }
              }

            }
          }
        }
      })
    );

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
  });

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
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",

            "scope": [{
              "name": "foo",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 9
                },

                "end": {
                  "line": 1,
                  "column": 12
                }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
              yield {
                "type": "stackFrame",
                "filename": "testFile",
                "name": "foo",
                "scope": [],
                "evalInScope": function (expr) {
                  return eval(expr);
                }
              };

              {
                yield {
                  "type": "step",
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

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
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
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",

            "scope": [{
              "name": "foo",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 4
                },

                "end": {
                  "line": 1,
                  "column": 7
                }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
              yield {
                "type": "stackFrame",
                "filename": "testFile",
                "name": "anonymous function",
                "scope": [],
                "evalInScope": function (expr) {
                  return eval(expr);
                }
              };
              {
                yield {
                  "type": "step",
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

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
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
        function*__top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",

            "scope": [{
              "name": "foo",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 9
                },

                "end": {
                  "line": 1,
                  "column": 12
                }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
              yield {
                "type": "stackFrame",
                "filename": "testFile",
                "name": "foo",
                "scope": [],
                "evalInScope": function (expr) {
                  return eval(expr);
                }
              };
              {
                yield {
                  "type": "step",
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
              "type": "step",
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
            }, this, arguments);
          }
        }
      })
    );

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
  });

  it('should *thunkify and yield nested function calls wat', function () {
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
        function* __top() {
          yield {
            "type": "stackFrame",
            "filename": "testFile",
            "name": "Global Scope",

            "scope": [{
              "name": "bar",

              "locs": [{
                "start": {
                  "line": 1,
                  "column": 9
                },

                "end": {
                  "line": 1,
                  "column": 12
                }
              }]
            }, {
              "name": "foo",

              "locs": [{
                "start": {
                  "line": 7,
                  "column": 9
                },

                "end": {
                  "line": 7,
                  "column": 12
                }
              }]
            }],
            "evalInScope": function (expr) {
              return eval(expr);
            }
          };

          {
            yield {
              "type": "step",
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
              yield {
                "type": "stackFrame",
                "filename": "testFile",
                "name": "bar",

                "scope": [{
                  "name": "baz",

                  "locs": [{
                    "start": {
                      "line": 2,
                      "column": 9
                    },

                    "end": {
                      "line": 2,
                      "column": 12
                    }
                  }]
                }],
                "evalInScope": function (expr) {
                  return eval(expr);
                }
              };

              {
                yield {
                  "type": "step",
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
                  yield {
                    "type": "stackFrame",
                    "filename": "testFile",
                    "name": "baz",
                    "scope": [],
                    "evalInScope": function (expr) {
                      return eval(expr);
                    }
                  };

                  {
                    yield {
                      "type": "step",
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
                    }, this, arguments);
                  }
                }
              }

              {
                yield {
                  "type": "step",
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
                }, this, arguments);
              }
            }
          }

          {
            yield {
              "type": "step",
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
              yield {
                "type": "stackFrame",
                "filename": "testFile",
                "name": "foo",
                "scope": [],
                "evalInScope": function (expr) {
                  return eval(expr);
                }
              };

              {
                yield {
                  "type": "step",
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
                }, this, arguments);
              }
            }
          }

          {
            yield {
              "type": "step",
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
            }, this, arguments);
          }
        }
      })
    );

    assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
  });

  describe('debugger statements', function () {

    it('should replace debugger statements with yields', function () {
      var source = parse(
        fnString(function () {
          1;
          debugger;
          2;
        })
      );

      var expected = parse(
        fnString(function () {
          function* __top() {
            yield {
              "type": "stackFrame",
              "filename": "testFile",
              "name": "Global Scope",
              "scope": [],

              "evalInScope": function(expr) {
                return eval(expr);
              }
            };

            {
              yield {
                "type": "step",

                "start": {
                  "line": 1,
                  "column": 0
                },

                "end": {
                  "line": 1,
                  "column": 2
                }
              };

              1;
            }

            yield {
              "type": "debugger",

              "start": {
                "line": 2,
                "column": 0
              },

              "end": {
                "line": 2,
                "column": 9
              }
            };

            {
              yield {
                "type": "step",

                "start": {
                  "line": 3,
                  "column": 0
                },

                "end": {
                  "line": 3,
                  "column": 2
                }
              };

              2;
            }
          }
        })
      );

      assertEqualsAST(transform(source, { filename: 'testFile' }), expected);
    });

  });

  describe('exclude steps', function () {
      var source = parse(
        fnString(function () {
          1;
          2;
        })
      );
      var expected = parse(
        fnString(function () {
          function* __top() {
            yield {
              "type": "stackFrame",
              "filename": "testFile",
              "name": "Global Scope",
              "scope": [],

              "evalInScope": function(expr) {
                return eval(expr);
              }
            };

            1;
            2;
          }
        })
      );
      assertEqualsAST(
        transform(source, { filename: 'testFile', excludeSteps: true }),
        expected
      );
  });
});

describe('new expressions', function () {
  it('should ignore transforming natives', function () {
    var source = parse(
      fnString(function () {
        var d = new Date();
      })
    );
    var expected = parse(
      fnString(function () {
        function* __top() {
           yield {
              "type": "stackFrame",
              "filename": "testFile",
              "name": "Global Scope",

              "scope": [{
                  "name": "d",

                  "locs": [{
                      "start": {
                          "line": 1,
                          "column": 4
                      },

                      "end": {
                          "line": 1,
                          "column": 5
                      }
                  }]
              }],

              "evalInScope": function(expr) {
                  return eval(expr);
              }
          };
          {
            yield {
                "type": "step",

                "start": {
                    "line": 1,
                    "column": 0
                },

                "end": {
                    "line": 1,
                    "column": 19
                }
            };

            var d = new Date();
          }
        }
      })
    );
    assertEqualsAST(
      transform(source, { filename: 'testFile' }),
      expected
    );
  });

  it('should transform non natives', function () {
    var source = parse(
      fnString(function () {
        var h = new Human(1, 2, 3);
      })
    );
    var expected = parse(
      fnString(function () {
        function* __top() {
           yield {
              "type": "stackFrame",
              "filename": "testFile",
              "name": "Global Scope",

              "scope": [{
                  "name": "h",

                  "locs": [{
                      "start": {
                          "line": 1,
                          "column": 4
                      },

                      "end": {
                          "line": 1,
                          "column": 5
                      }
                  }]
              }],

              "evalInScope": function(expr) {
                  return eval(expr);
              }
          };
          {
            yield {
                "type": "step",

                "start": {
                    "line": 1,
                    "column": 0
                },

                "end": {
                    "line": 1,
                    "column": 27
                }
            };

            var h = __instantiate(Human, 1, 2, 3);
          }
        }
      })
    );
    assertEqualsAST(
      transform(source, { filename: 'testFile' }),
      expected
    );
  });
});
