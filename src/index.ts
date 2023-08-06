#!/usr/bin/env node
import fs from 'fs'
import inquirer from 'inquirer'
import { installDependencies } from './scripts/installDependencies.js'
import { modifyScripts } from './scripts/modifyScripts.js'
import { romeConfig } from './scripts/linter-formatters/rome.js'
import { prettierConfig } from './scripts/linter-formatters/eslint-prettier.js'
import { eslintConfig } from './scripts/linter-formatters/eslint-prettier.js'
import { readFileSync } from 'fs'
import ora from 'ora'
import { createPackageJson } from './scripts/createPackageJson.js'
import { cloneRepo } from './scripts/cloneRepo.js'
const packageInfo = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)).toString())

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
]

export async function mainFunction() {
  console.log(`
        SERANGED              EVM               BOOTSTRAP
                                                                                                                               
 53 45 52 41 4E 47 45 44    45 56 4D    42 4F 4F 54 53 54 52 41 50   
 
Package Version: ${packageInfo.version}
  `)
  try {
    const answers = await inquirer.prompt(questions)
    const directory = `./${answers.projectName}`
    const spinner: any = ora('Adding package.json').start()
    createPackageJson(answers.projectName, directory)
    spinner.succeed()
    const repoUrl = 'https://github.com/Seranged/EVM-FE-Bootstrap.git'
    const branch = 'cli-base'
    const spinnerRepo: any = ora('Installing base NextJS files').start()
    await cloneRepo(repoUrl, branch, directory)
    spinnerRepo.succeed()
    if (answers.linter === 'ESLint+Prettier') {
      const spinner: any = ora('Adding and installing Eslint and Prettier...').start()
      await installDependencies(['eslint', 'prettier'])
      fs.writeFileSync(`${directory}/.eslintrc.js`, `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`)
      fs.writeFileSync(`${directory}/.prettierrc.json`, JSON.stringify(prettierConfig, null, 2))
      spinner.succeed()
    } else if (answers.linter === 'Rome') {
      const spinner: any = ora('Adding and installing Rome...').start()
      await installDependencies(['rome'])
      fs.writeFileSync(`${directory}/rome.json`, JSON.stringify(romeConfig, null, 2))
      spinner.succeed()
    }
    // if (answers.typeChecker === 'AbiType') {
    //   fs.copyFileSync(
    //     path.join(__dirname, './scripts/nextjs/evmTypescript/functions/readContract.ts'),
    //     path.join(process.cwd(), './src/contracts/readContract.ts'),
    //   )
    // }

    if (answers.dependencies && answers.dependencies.length > 0) {
      await installDependencies(answers.dependencies)
    }

    if (answers.scripts && answers.scripts.length > 0) {
      await modifyScripts(answers.scripts)
    }
    console.log('EVM scaffolding CLI has finished running.')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

mainFunction()
