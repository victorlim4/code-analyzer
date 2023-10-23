const isVar = (node) =>
    node.type === 'VariableDeclaration' && node.kind === 'var';

function variables (node, issues) {
    if (isVar(node)) {
      issues.push({
        message: 'Evite o uso de "var". Use "let" ou "const" em vez disso.',
        location: {
          line: node.loc.start.line,
          column: node.loc.start.column,
        },
      });
    }
}

export { variables }