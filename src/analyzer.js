import * as acorn from "acorn";
import * as estraverse from "estraverse";
import chalk from 'chalk';
import { for_loops } from "./rules/for_loops.js";
import { concatenation } from "./rules/concatenation.js";
import { variables } from "./rules/variables.js";

export const analyzer = (code) => {
    const lines = code.split('\n');
    const issues = [];

    const ast = acorn.parse(code, {
      locations: true,
      ecmaVersion: 2020,
    });

    estraverse.traverse(ast, {
        enter: (node) => {
            variables(node, issues);
            for_loops(node, issues);
            concatenation(node, issues);
        },
    });

    if (issues.length > 0) logger(issues);
    else console.log(chalk.green('Nenhum problema de qualidade de código encontrado!'));
}

export const logger = (issues) => {
    issues.forEach((issue) => {
        console.log(chalk.red('Problema de Qualidade de Código encontrado:'));
        console.log(chalk.yellow(`- ${issue.message}`));
        console.log(chalk.gray(`  (line ${issue.location.line}:${issue.location.column})`));
        console.log('');
    });
}