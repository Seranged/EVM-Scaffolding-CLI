# EVM Scaffolding CLI

EVM Scaffolding CLI is a command-line interface tool that helps you bootstrap EVM projects based against your preferences. It provides a simple and interactive way to set up your project with the components you need.

## Installation

You don't need to install the CLI globally. You can use `npx` to run it without installing:

`npx evm-scaffolding-cli`

## Usage

When you run the CLI, it will ask you a series of questions to determine how to set up your project:

1. **Project name**: The name of your new project.
2. **Linter/Formatter**: Choose between 'Rome' and 'ESLint and Prettier'.
3. **Nextjs router**: Choose between 'App Router' and 'Pages Router'.
4. **Wallet connection handler**: Choose between 'RainbowKit' and 'ConnectKit'.
5. **UI framework**: Choose between 'Shadcn', 'DaisyUI' or 'None' to use alongside Tailwind.

Based on your responses, the CLI will perform the following actions:

- Create a new directory with the name of your project.
- Generate a `package.json` file.
- Install the necessary dependencies.
- Set up initial components and logic.

This setup allows you to quickly start building onchain applications.