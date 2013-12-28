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

function createStep(loc) {
  var node = b.expressionStatement(
    b.yieldExpression(
      b.objectExpression([
        b.property(
          'init',
          b.literal('start'),
          createObjectExpression(loc.start)
        ),
        b.property(
          'init',
          b.literal('end'),
          createObjectExpression(loc.end)
        )
      ]),
      false
    )
  );
  Object.defineProperty(node, '__stepper', { value: true });
  return node;
}

function createStackFrame(path) {
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
      b.objectExpression([
        b.property('init', b.literal('type'), b.literal('stackFrame')),
        b.property('init', b.literal('name'), b.literal(name)),
        b.property('init', b.literal('scope'), b.arrayExpression(bindingNodes))
      ]),
      false
    )
  );

  Object.defineProperty(ret, '__stepper', { value: true });
  return ret;
}

function transform(ast) {
  recast.types.traverse(ast, function (n) {
    if (n.__stepper) {
      return false;
    }

    if (types.Function.check(n)) {
      this.get('body').replace(
        b.blockStatement([createStackFrame(this)].concat(n.body.body))
      );
      n.generator = true;
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
    } else if (types.CallExpression.check(n)) {
      var thunk = b.callExpression(
        b.identifier('__thunk'), [
          b.functionExpression(
            b.identifier('thunk'),
            [],
            b.blockStatement([
              b.returnStatement(n)
            ]),
            true
          ),
          b.thisExpression()
        ]
      );
      this.replace(
        b.yieldExpression(thunk, false)
      );
    }
  });

  var body = ast.program.body;
  body.unshift(createStackFrame(new recast.types.NodePath(ast.program)));
  ast.program = b.program([
    b.functionDeclaration(
      b.identifier('__top'), [], b.blockStatement(body), true
    )
  ]);
  return ast;
}

module.exports = transform;
