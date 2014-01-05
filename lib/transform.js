var recast = require('recast');
var b = recast.types.builders;
var types = recast.types.namedTypes;

function createObjectExpression(obj) {
  var props = [];
  for (var prop in obj) {
    var val = typeof obj[prop] === 'object' ? obj[prop] : b.literal(obj[prop]);
    props.push(b.property('init', b.literal(prop), val));
  }
  return b.objectExpression(props);
}

function createStep(loc, isDebugger) {
  var node = b.expressionStatement(
    b.yieldExpression(
      createObjectExpression({
        type: isDebugger ? 'debugger' : 'step',
        start: createObjectExpression(loc.start),
        end: createObjectExpression(loc.end)
      }),
      false
    )
  );
  Object.defineProperty(node, '__stepper', { value: true });
  return node;
}

function createStackFrame(path, filename) {
  var name;
  if (path.scope.isGlobal) {
    name = 'Global Scope';
  } else if (path.get('id').value) {
    name = path.get('id').value.name;
  } else {
    name = 'anonymous function';
  }

  var bindings = path.get('body').scope.getBindings();
  var bindingNodes = [];
  for (var varName in bindings) {
    bindingNodes.push(createObjectExpression({
      name: varName,
      locs: b.arrayExpression(bindings[varName].map(function (p) {
        return createObjectExpression({
          start: createObjectExpression(p.value.loc.start),
          end: createObjectExpression(p.value.loc.end)
        });
      }))
    }));
  }

  var ret = b.expressionStatement(
    b.yieldExpression(
      createObjectExpression({
        type: 'stackFrame',
        filename: filename,
        name: name,
        scope: b.arrayExpression(bindingNodes),
        evalInScope: b.functionExpression(
            null,
            [b.identifier('expr')],
            b.blockStatement([b.returnStatement(
              b.callExpression(b.identifier('eval'), [b.identifier('expr')])
            )]),
            false
          )
      }),
      false
    )
  );

  Object.defineProperty(ret, '__stepper', { value: true });
  return ret;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
var NATIVES = ['Array', 'ArrayBuffer', 'Boolean', 'DataView', 'Date', 'Error',
                'EvalError', 'Float32Array', 'Float64Array', 'Function',
                'Generator', 'InternalError', 'Int16Array', 'Int32Array',
                'Int8Array', 'Iterator', 'JSON', 'Map', 'Math', 'NaN', 'Number',
                'Object', 'ParallelArray', 'Proxy', 'RangeError',
                'ReferenceError', 'Reflect', 'RegExp', 'Set', 'StopIteration',
                'String', 'Symbol', 'SyntaxError', 'TypeError', 'Uint16Array',
                'Uint32Array', 'Uint8Array', 'Uint8ClampedArray', 'URIError',
                'WeakMap', 'WeakSet'];

function transform(ast, options) {
  recast.types.traverse(ast, function (n) {
    if (n.__stepper) {
      return false;
    }

    if (types.CallExpression.check(n)) {
      var thunk = b.callExpression(
        b.identifier('__thunk'), [
          b.functionExpression(
            b.identifier('thunk'),
            [],
            b.blockStatement([b.returnStatement(n)]),
            true
          ),
          b.thisExpression(),
          b.identifier('arguments')
        ]
      );
      this.replace(
        b.yieldExpression(thunk, false)
      );
    }

    if (types.Function.check(n)) {
      this.get('body').replace(
        b.blockStatement(
          [createStackFrame(this, options.filename)].concat(n.body.body)
        )
      );
      n.generator = true;
    }

    if (types.NewExpression.check(n)) {
      if (NATIVES.indexOf(n.callee.name) === -1) {
        var args = [n.callee].concat(n.arguments);
        this.replace(b.callExpression(b.identifier('__instantiate'), args));
      }
    }

    if (options.excludeSteps) {
      return;
    }

    if (types.DebuggerStatement.check(n)) {
      this.replace(createStep(n.loc, true));
      return;
    }

    var parent = this.parent && this.parent.node;

    // If this is a loop make sure to add an additional stepper at the end
    // of the loop so we can step on the condition.
    if (types.ForStatement.check(n) ||
        types.ForInStatement.check(n) ||
        types.WhileStatement.check(n)) {
      this.get('body').replace(b.blockStatement([n.body, createStep(n.loc)]));
    }

    if (types.Statement.check(n) &&
        // Block statements are just groupings of other statements so we ignore
        !types.BlockStatement.check(n) &&
        // Don't insert yield statements inside loop clauses.
        !types.ForStatement.check(parent) &&
        !types.ForInStatement.check(parent)) {
      this.replace(b.blockStatement([createStep(n.loc), n]));
    }
  });

  var body = ast.program.body;
  body.unshift(
    createStackFrame(new recast.types.NodePath(ast.program), options.filename)
  );
  ast.program = b.program([
    b.functionDeclaration(
      b.identifier('__top'), [], b.blockStatement(body), true
    )
  ]);
  return ast;
}

module.exports = transform;
