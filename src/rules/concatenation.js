const isConcatenation = (node) =>
    node.type === 'BinaryExpression' && node.operator === '+';

function concatenation (node, issues) {
    if (isConcatenation(node)) {
        issues.push({
            message: 'Evite a concatenação excessiva de strings em loops. Use array.join() para melhor desempenho.',
            location: {
              line: node.loc.start.line,
              column: node.loc.start.column,
            },
        });
    }
}

export { concatenation }