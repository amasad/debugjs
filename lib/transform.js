var recast = require('recast');
var b = recast.types.builders;
var types = recast.types.namedTypes;

function createStep(loc) {
  var node = b.expressionStatement(
    b.yieldExpression(
      b.objectExpression([
        b.property(
          'init',
          b.literal('start'),
          b.objectExpression([
            b.property('init', b.literal('line'), b.literal(loc.start.line)),
            b.property('init', b.literal('column'), b.literal(loc.start.column))
          ])
        ),
        b.property(
          'init',
          b.literal('end'),
          b.objectExpression([
            b.property('init', b.literal('line'), b.literal(loc.end.line)),
            b.property('init', b.literal('column'), b.literal(loc.end.column))
          ])
        )
      ]),
      false
    )
  );
  Object.defineProperty(node, '__stepper', { value: true });
  return node;
}

function transform(ast) {
  recast.types.traverse(ast, function (n) {
    if (n.__stepper) {
      return false;
    }

    if (types.Function.check(n)) {
      n.generator = true;
    }

    var parent = this.parent && this.parent.node;

    // If this is a loop make sure to add an additional stepper at the end
    // of the loop so we can step on the condition.
    if (types.ForStatement.check(n) || types.ForInStatement.check(n)) {
      this.get('body').replace(b.blockStatement([n.body, createStep(n.loc)]));
    }

    if (types.Statement.check(n) &&
        // Block statements are just groupings of other statements so we ignore
        !types.BlockStatement.check(n) &&
        // Don't insert yield statements inside loop clauses.
        !types.ForStatement.check(parent) &&
        !types.ForInStatement.check(parent)) {
      n.loc || console.log(n)
      this.replace(b.blockStatement([createStep(n.loc), n]));
    } else if (types.CallExpression.check(n)) {
      var thunk = b.callExpression(
        b.identifier('__thunk'),
        [
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

  ast.program = b.program([
    b.functionDeclaration(
      b.identifier('__top'), [], b.blockStatement(ast.program.body), true
    )
  ]);
  return ast;
}

module.exports = transform;
