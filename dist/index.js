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
import path from 'path';
import { installDependencies } from './scripts/functions/installDependencies.js';
import { romeConfig } from './scripts/linter-formatters/rome.js';
import { prettierConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { eslintConfig } from './scripts/linter-formatters/eslint-prettier.js';
import { createPackageJson } from './scripts/createPackageJson.js';
import { cloneRepo } from './scripts/functions/cloneRepo.js';
import { RainbowKitNavbar } from './scripts/navbar/rainbowKitNavbar.js';
import { ConnectKitNavbar } from './scripts/navbar/connectKitNavbar.js';
import { createPrettierIgnore } from './scripts/linter-formatters/eslint-prettier.js';
import { appRouterRainbowKit, appRouterConnectKit } from './scripts/nextjs-routers/app/app.js';
import { pagesRouterRainbowKit, pagesRouterConnectKit } from './scripts/nextjs-routers/pages/pages.js';
import { page404 } from './scripts/nextjs-routers/404.js';
import { homePage } from './scripts/nextjs-routers/homePage.js';
import { createReadme } from './scripts/createReadme.js';
import { daisyUIConfig } from './scripts/uiKit/daisyUI.js';
import { shadcnComponentsJson, shadcnTailwindConfig, shadcnCnLibFunction, shadcnGlobalCSS, } from './scripts/uiKit/shadcn.js';
import { removeGitRemoteOrigin } from './scripts/functions/gitRemoteRemove.js';
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
        choices: ['Rome', 'ESLint and Prettier'],
    },
    {
        type: 'list',
        name: 'router',
        default: ['App Router'],
        message: 'Which Nextjs router do you want to use?',
        choices: ['App Router', 'Pages Router'],
    },
    {
        type: 'list',
        name: 'wallet',
        default: ['RainbowKit'],
        message: 'Which wallet connection handler do you want to use?',
        choices: ['RainbowKit', 'ConnectKit'],
    },
    {
        type: 'list',
        name: 'uiKit',
        default: ['Shadcn'],
        message: 'Which UI framework do you want to use alongside tailwind?',
        choices: ['Shadcn', 'DaisyUI', 'None'],
    },
    // {
    //   type: 'list',
    //   name: 'stateManager',
    //   message: 'Which global state manager do you want to use?',
    //   choices: ['Redux', 'Zustand'],
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
            const repoUrl = 'https://github.com/Seranged/EVM-Scaffold-Base-Application.git';
            const spinnerRepo = ora('Installing base NextJS files').start();
            yield cloneRepo(repoUrl, directory);
            yield removeGitRemoteOrigin(directory);
            fs.writeFileSync(`${directory}/README.md`, createReadme(answers.wallet, answers.linter, answers.uiKit));
            spinnerRepo.succeed();
            const spinnerInstall = ora('Installing base dependencies').start();
            yield createPackageJson(answers.projectName, directory, answers.linter);
            yield installDependencies([], directory);
            spinnerInstall.succeed();
            if (answers.linter === 'ESLint and Prettier') {
                const spinner = ora('Adding and installing Eslint and Prettier...').start();
                yield installDependencies(['eslint', 'prettier'], directory);
                fs.writeFileSync(`${directory}/.eslintrc.js`, `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
                fs.writeFileSync(`${directory}/.prettierrc.json`, JSON.stringify(prettierConfig, null, 2));
                createPrettierIgnore(directory);
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
                fs.mkdirSync(path.join(directory, 'src', 'components', 'Navbar'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'components', 'Navbar', 'Navbar.tsx'), RainbowKitNavbar);
                spinner.succeed();
            }
            if (answers.wallet === 'ConnectKit') {
                const spinner = ora('Adding RainbowKit and a Navbar...').start();
                yield installDependencies(['connectkit'], directory);
                fs.mkdirSync(path.join(directory, 'src', 'components', 'Navbar'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'components', 'Navbar', 'Navbar.tsx'), ConnectKitNavbar);
                spinner.succeed();
            }
            if (answers.wallet === 'ConnectKit' && answers.router === 'App Router') {
                const spinner = ora('Adding ConnectKit App Router...').start();
                fs.mkdirSync(path.join(directory, 'src', 'app'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'app', 'layout.tsx'), appRouterConnectKit);
                fs.writeFileSync(path.join(directory, 'src', 'app', 'not-found.tsx'), page404);
                fs.writeFileSync(path.join(directory, 'src', 'app', 'page.tsx'), homePage);
                spinner.succeed();
            }
            if (answers.wallet === 'RainbowKit' && answers.router === 'App Router') {
                const spinner = ora('Adding RainbowKit App Router...').start();
                fs.mkdirSync(path.join(directory, 'src', 'app'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'app', 'layout.tsx'), appRouterRainbowKit);
                fs.writeFileSync(path.join(directory, 'src', 'app', 'not-found.tsx'), page404);
                fs.writeFileSync(path.join(directory, 'src', 'app', 'page.tsx'), homePage);
                spinner.succeed();
            }
            if (answers.wallet === 'ConnectKit' && answers.router === 'Pages Router') {
                const spinner = ora('Adding ConnectKit Pages Router...').start();
                fs.mkdirSync(path.join(directory, 'src', 'pages'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'pages', '_app.tsx'), pagesRouterConnectKit);
                fs.writeFileSync(path.join(directory, 'src', 'pages', '404.tsx'), page404);
                fs.writeFileSync(path.join(directory, 'src', 'pages', 'index.tsx'), homePage);
                spinner.succeed();
            }
            if (answers.wallet === 'RainbowKit' && answers.router === 'Pages Router') {
                const spinner = ora('Adding RainbowKit Pages Router...').start();
                fs.mkdirSync(path.join(directory, 'src', 'pages'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'pages', '_app.tsx'), pagesRouterRainbowKit);
                fs.writeFileSync(path.join(directory, 'src', 'pages', '404.tsx'), page404);
                fs.writeFileSync(path.join(directory, 'src', 'pages', 'index.tsx'), homePage);
                spinner.succeed();
            }
            if (answers.uiKit === 'DaisyUI') {
                const spinner = ora('Adding DaisyUI and configuration files...').start();
                yield installDependencies(['daisyui@latest'], directory);
                fs.writeFileSync(path.join(directory, 'tailwind.config.js'), daisyUIConfig);
                spinner.succeed();
            }
            if (answers.uiKit === 'Shadcn') {
                const spinner = ora('Adding Shadcn and configuration files...').start();
                yield installDependencies(['shadcn-ui', 'clsx', 'tailwind-merge', 'tailwindcss-animate', 'class-variance-authority', 'lucide-react'], directory);
                fs.mkdirSync(path.join(directory, 'src', 'lib'), { recursive: true });
                fs.writeFileSync(path.join(directory, 'src', 'lib', 'utils.ts'), shadcnCnLibFunction);
                fs.writeFileSync(path.join(directory, 'src', 'styles', 'globals.css'), shadcnGlobalCSS);
                fs.writeFileSync(path.join(directory, 'tailwind.config.js'), shadcnTailwindConfig);
                fs.writeFileSync(path.join(directory, 'components.json'), shadcnComponentsJson);
                spinner.succeed();
            }
            console.log('EVM scaffolding CLI has finished running.');
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    });
}
mainFunction();
