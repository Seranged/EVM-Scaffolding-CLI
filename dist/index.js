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
import fs from 'fs';
import { readFileSync } from 'fs';
import ora from 'ora';
import inquirer from 'inquirer';
import { installDependencies } from './scripts/installDependencies.js';
import { modifyScripts } from './scripts/modifyScripts.js';
import { romeConfig } from './scripts/linter-formatters/rome.js';
import { prettierConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { eslintConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { createPackageJson } from './scripts/createPackageJson.js';
import { cloneRepo } from './scripts/cloneRepo.js';
import { RainbowKitNavbar } from './scripts/navbar/rainbowKitNavbar.js';
const packageInfo = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)).toString());
const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'my-project',
    },
    {
        type: 'list',
        name: 'linter',
        message: 'Which linter/formatter do you want to use?',
        default: ['Rome'],
        choices: ['Rome', 'ESLint and Prettier', 'None'],
    },
    // {
    //   type: 'list',
    //   name: 'router',
    //   default: ['App Router'],
    //   message: 'Which Nextjs router do you want to use?',
    //   choices: ['App Router', 'Pages Router'],
    // },
    {
        type: 'list',
        name: 'wallet',
        default: ['RainbowKit'],
        message: 'Which wallet connection handler do you want to use?',
        choices: ['RainbowKit', 'FamilyKit', 'None'],
    },
    // {
    //   type: 'list',
    //   name: 'uiKit',
    //   default: ['Shadcn'],
    //   message: 'Which UI framework do you want to use alongside tailwind?',
    //   choices: ['Shadcn', 'Flowbite', 'DaisyUI', 'None'],
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
  ︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾

          SERANGED              EVM               BOOTSTRAP                                                                                                 
  53 45 52 41 4E 47 45 44    45 56 4D    42 4F 4F 54 53 54 52 41 50   
 
               Package Version: ${packageInfo.version}

  ︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾
  `);
        try {
            const answers = yield inquirer.prompt(questions);
            const directory = `./${answers.projectName}`;
            const repoUrl = 'https://github.com/Seranged/EVM-FE-Bootstrap.git';
            const branch = 'cli-base';
            const spinnerRepo = ora('Installing base NextJS files').start();
            yield cloneRepo(repoUrl, branch, directory);
            spinnerRepo.succeed();
            const spinnerInstall = ora('Installing base dependencies').start();
            yield createPackageJson(answers.projectName, directory);
            yield installDependencies([], directory);
            spinnerInstall.succeed();
            if (answers.linter === 'ESLint and Prettier') {
                const spinner = ora('Adding and installing Eslint and Prettier...').start();
                yield installDependencies(['eslint', 'prettier'], directory);
                fs.writeFileSync(`${directory}/.eslintrc.js`, `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
                fs.writeFileSync(`${directory}/.prettierrc.json`, JSON.stringify(prettierConfig, null, 2));
                spinner.succeed();
            }
            else if (answers.linter === 'Rome') {
                const spinner = ora('Adding and installing Rome...').start();
                yield installDependencies(['rome'], directory);
                fs.writeFileSync(`${directory}/rome.json`, JSON.stringify(romeConfig, null, 2));
                spinner.succeed();
            }
            if (answers.wallet === 'RainbowKit') {
                const spinner = ora('Adding RainbowKit and a Navbar...').start();
                yield installDependencies(['@rainbow-me/rainbowkit'], directory);
                fs.writeFileSync(`${directory}/src/components/navbar/rainbowKitNavbar.tsx`, RainbowKitNavbar);
                spinner.succeed();
            }
            // if (answers.typeChecker === 'AbiType') {
            //   fs.copyFileSync(
            //     path.join(__dirname, './scripts/nextjs/evmTypescript/functions/readContract.ts'),
            //     path.join(process.cwd(), './src/contracts/readContract.ts'),
            //   )
            // }
            if (answers.dependencies && answers.dependencies.length > 0) {
                yield installDependencies(answers.dependencies, directory);
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
// test
