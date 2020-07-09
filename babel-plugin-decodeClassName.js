module.exports = ({ types: t, }) => {
  return {
    visitor: {
      JSXAttribute (path, state) {
        if (path.node.name.name !== 'className') {
          return;
        }

        const value = path.get('value');

        if (value.isJSXExpressionContainer()) {
          const expression = value.get('expression');

          if (
            expression.isArrayExpression()
            || expression.isIdentifier()
            || expression.isNumericLiteral()
            || expression.isObjectExpression()
            || expression.isStringLiteral()
            || expression.isTemplateLiteral()
          ) {
            expression.replaceWith(t.callExpression(t.cloneNode(state.decodeClassNameIdentifier), [  t.cloneNode(expression.node), ]));

            state.$ = true;
          }
        }

        if (value.isStringLiteral()) {
          value.replaceWith(t.JSXExpressionContainer(t.callExpression(t.cloneNode(state.decodeClassNameIdentifier), [  t.cloneNode(value.node), ])));

          state.$ = true;
        }
      },
      Program: {
        enter (path, state) {
          state.decodeClassNameIdentifier = path.scope.generateUidIdentifier('decodeClassName');
        },
        exit (path, state) {
          if (state.$) {
            path.node.body.unshift(t.importDeclaration([ t.importDefaultSpecifier(state.decodeClassNameIdentifier), ], t.stringLiteral('@redredsk/helpers/private/decodeClassName')));
          }
        },
      },
    },
  };
};
