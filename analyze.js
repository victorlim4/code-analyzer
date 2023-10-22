import * as acorn from "acorn";
import * as estraverse from "estraverse";

const isVar = (node) => node.type === 'VariableDeclaration' && node.kind === 'var';

const findIncorrectVariables = (node, issues) => {
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

const findLoops = (node, issues) => {
  if (node.type === 'ForStatement' || node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
    issues.push({
      message: 'Evite o uso excessivos de loops For. Use map, filter, reduce ou forEach, se apropriado.',
      location: {
        line: node.loc.start.line,
        column: node.loc.start.column,
      },
    });
  }
}

const findConcatenation = (node, issues) => {
    if (node.type === 'BinaryExpression' && node.operator === '+') {
        issues.push({
            message: 'Evite a concatenação excessiva de strings em loops. Use array.join() para melhor desempenho.',
            location: {
              line: node.loc.start.line,
              column: node.loc.start.column,
            },
        });
    }
}

const log = (issue) => {
  console.log('\x1b[31mProblema de qualidade de código:\x1b[0m');
  console.log('\x1b[33m- ' + issue.message + '\x1b[0m');
  console.log(`  (linha ${issue.location.line}:${issue.location.column})`);
  console.log('');
}

export const analyze = (code) => {
  const lines = code.split('\n');
  const issues = [];

  const ast = acorn.parse(code, {
    locations: true,
    ecmaVersion: 2020,
  });

  estraverse.traverse(ast, {
    enter: function (node) {
      findIncorrectVariables(node, issues);
      findLoops(node, issues);
      findConcatenation(node, issues);
    },
  });

  if (issues.length > 0) {
    issues.forEach(log);
  } else {
    console.log('\x1b[32mNenhum problema de qualidade de código encontrado.\x1b[0m');
  }
}