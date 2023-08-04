#!/usr/bin/env node
import * as inquirer from 'inquirer';
const installDependencies = require('./scripts/installDependencies');
const modifyScripts = require('./scripts/modifyScripts');
const fs = require('fs');
import { romeConfig } from '../src/scripts/linter-formatters/rome'
import { prettierConfig, eslintConfig } from '../src/scripts/linter-formatters/eslint-prettier'

const questions = [
  {
    type: 'list',
    name: 'linter',
    message: 'Which linter/formatter do you want to use?',
    choices: ['ESLint+Prettier', 'Rome'],
  },
  {
    type: 'checkbox',
    name: 'scripts',
    message: 'Which scripts would you like to modify?',
    choices: [
      'script1',
      'script2',
      'script3',
      // Add more scripts as needed
    ],
  },
];

async function main() {
  try {
const  answers = await (inquirer as any).prompt(questions);
    
    if (answers.linter === 'ESLint+Prettier') {
      await installDependencies(['eslint', 'prettier']);
      fs.writeFileSync('.eslintrc.js', `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
      fs.writeFileSync('.prettierrc.json', JSON.stringify(prettierConfig, null, 2));    } else if (answers.linter === 'Rome') {
      await installDependencies(['rome']);
      fs.writeFileSync('rome.json', JSON.stringify(romeConfig, null, 2));
    }

    if (answers.dependencies.length > 0) {
      await installDependencies(answers.dependencies);
    }

    if (answers.scripts.length > 0) {
      await modifyScripts(answers.scripts);
    }

    console.log('EVM scaffolding CLI has finished running.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
