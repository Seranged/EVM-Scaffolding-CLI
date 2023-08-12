import fs from 'fs'

export const eslintConfig = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
}

export const prettierConfig = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
}

export function createPrettierIgnore(directory: string): void {
  const ignorePatterns = ['# Ignore artifacts:', 'build', 'coverage', 'node_modules'].join('\n')

  fs.writeFileSync(`${directory}/.prettierignore`, ignorePatterns)
}
