#!/usr/bin/env node
import inquirer from 'inquirer';
import { installDependencies } from './scripts/installDependencies.js';
import { modifyScripts } from './scripts/modifyScripts.js';
import fs from 'fs';
import { romeConfig } from './scripts/linter-formatters/rome.js';
import { prettierConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { eslintConfig } from './scripts/linter-formatters/eslint-prettier.js';
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
        choices: ['RainbowKit', 'FamilyKit'],
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
    console.log(`
        SERANGED              EVM               BOOTSTRAP
                                                                                                                               
 53 45 52 41 4E 47 45 44    45 56 4D    42 4F 4F 54 53 54 52 41 50                                      
  `);
    try {
        const answers = await inquirer.prompt(questions);
        if (answers.linter === 'ESLint+Prettier') {
            await installDependencies(['eslint', 'prettier']);
            fs.writeFileSync('.eslintrc.js', `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
            fs.writeFileSync('.prettierrc.json', JSON.stringify(prettierConfig, null, 2));
        }
        else if (answers.linter === 'Rome') {
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
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}
mainFunction();
