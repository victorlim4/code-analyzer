const isFor = (node) =>
    node.type === 'ForStatement' || node.type === 'ForInStatement' || node.type === 'ForOfStatement';

function for_loops (node, issues) {
    if (isFor(node)) {
        issues.push({
            message: 'Evite o uso excessivo de loops For. Use map, filter, reduce ou forEach, se apropriado.',
            location: {
              line: node.loc.start.line,
              column: node.loc.start.column,
            },
        });
    }
}

export { for_loops }