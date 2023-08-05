#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import { installDependencies } from './scripts/installDependencies.js';
import { modifyScripts } from './scripts/modifyScripts.js';
import fs from 'fs';
import { romeConfig } from './scripts/linter-formatters/rome.js';
import { prettierConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { eslintConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { readFileSync } from 'fs';
const packageInfo = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)).toString());
const questions = [
    {
        type: 'list',
        name: 'linter',
        message: 'Which linter/formatter do you want to use?',
        default: ['Rome'],
        choices: ['Rome', 'ESLint+Prettier', 'None'],
    },
    // {
    //   type: 'list',
    //   name: 'router',
    //   default: ['App Router'],
    //   message: 'Which Nextjs router do you want to use?',
    //   choices: ['App Router', 'Pages Router'],
    // },
    // {
    //   type: 'list',
    //   name: 'uiKit',
    //   default: ['Shadcn'],
    //   message: 'Which UI framework do you want to use alongside tailwind?',
    //   choices: ['Shadcn', 'Flowbite', 'DaisyUI', 'None'],
    // },
    // {
    //   type: 'list',
    //   name: 'wallet',
    //   default: ['RainbowKit'],
    //   message: 'Which wallet connection handler do you want to use?',
    //   choices: ['RainbowKit', 'FamilyKit', 'None'],
    // },
    // {
    //   type: 'list',
    //   name: 'typeChecker',
    //   default: ['AbiType'],
    //   message: 'Which EVM contract type checker do you want to use?',
    //   choices: ['AbiType', 'TypeChain', 'None'],
    // },
    // {
    //   type: 'list',
    //   name: 'stateManager',
    //   message: 'Which global state manager do you want to use?',
    //   choices: ['Redux', 'MobX', 'Zustand', 'None'],
    // },
];
export function mainFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`
        SERANGED              EVM               BOOTSTRAP
                                                                                                                               
 53 45 52 41 4E 47 45 44    45 56 4D    42 4F 4F 54 53 54 52 41 50   
 
Package Version: ${packageInfo.version}
  `);
        try {
            const answers = yield inquirer.prompt(questions);
            if (answers.linter === 'ESLint+Prettier') {
                yield installDependencies(['eslint', 'prettier']);
                fs.writeFileSync('.eslintrc.js', `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
                fs.writeFileSync('.prettierrc.json', JSON.stringify(prettierConfig, null, 2));
            }
            else if (answers.linter === 'Rome') {
                yield installDependencies(['rome']);
                fs.writeFileSync('rome.json', JSON.stringify(romeConfig, null, 2));
            }
            // if (answers.typeChecker === 'AbiType') {
            //   fs.copyFileSync(
            //     path.join(__dirname, './scripts/nextjs/evmTypescript/functions/readContract.ts'),
            //     path.join(process.cwd(), './src/contracts/readContract.ts'),
            //   )
            // }
            if (answers.dependencies && answers.dependencies.length > 0) {
                yield installDependencies(answers.dependencies);
            }
            if (answers.scripts && answers.scripts.length > 0) {
                yield modifyScripts(answers.scripts);
            }
            console.log('EVM scaffolding CLI has finished running.');
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    });
}
mainFunction();
