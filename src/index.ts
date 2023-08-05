#!/usr/bin/env node
import inquirer from 'inquirer';
import { installDependencies } from './scripts/installDependencies';
import { modifyScripts } from './scripts/modifyScripts';
import fs from 'fs';
import {romeConfig} from '../src/scripts/linter-formatters/rome';
import {prettierConfig} from '../src/scripts/linter-formatters/eslint-prettier';
import {eslintConfig} from '../src/scripts/linter-formatters/eslint-prettier';

const questions = [
  {
    type: 'list',
    name: 'linter',
    message: 'Which linter/formatter do you want to use?',
    choices: ['ESLint+Prettier', 'Rome'],
  },
  {
    type: 'list',
    name: 'router',
    message: 'Which Nextjs router do you want to use?',
    choices: ['Pages Router', 'App Router'],
  },
  {
    type: 'list',
    name: 'uiKit',
    message: 'Which UI framework do you want to use alongside tailwind?',
    choices: ['Shadcn', 'Flowbite', 'DaisyUI'],
  },
  {
    type: 'list',
    name: 'wallet',
    message: 'Which wallet connection handler do you want to use?',
    choices: [ 'RainbowKit', 'FamilyKit'],
  },
  {
    type: 'list',
    name: 'typeChecker',
    message: 'Which EVM contract type checker do you want to use?',
    choices: ['AbiType', 'TypeChain'],
  },
  {
    type: 'list',
    name: 'stateManager',
    message: 'Which global state manager do you want to use?',
    choices: ['Redux', 'MobX', 'Zustand'],
  },
];




export async function mainFunction() {
  try {
    const answers = await inquirer.prompt(questions)    
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

mainFunction();
