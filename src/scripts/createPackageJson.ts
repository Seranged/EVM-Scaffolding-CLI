import fs from 'fs'
import latestVersion from 'latest-version';

export async function createPackageJson(projectName: string, directory: string, linter: string): Promise<void> {
  const scripts: { [key: string]: string } = {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
  }

  if (linter === 'Rome') {
    scripts.lint = 'pnpm rome check src --apply'
    scripts.format = 'pnpm rome format src --write'
  } else if (linter === 'ESLint and Prettier') {
    scripts.lint = 'next lint'
    scripts.format = 'prettier --write . --ignore-path .gitignore'
  } else if (linter === 'None') {
  }

  const dependencies = {
    '@types/node': await latestVersion('@types/node'),
    '@types/react': await latestVersion('@types/react'),
    '@types/react-dom': await latestVersion('@types/react-dom'),
    autoprefixer: await latestVersion('autoprefixer'),
    encoding: await latestVersion('encoding'),
    next: await latestVersion('next'),
    postcss: await latestVersion('postcss'),
    react: await latestVersion('react'),
    'react-dom': await latestVersion('react-dom'),
    tailwindcss: await latestVersion('tailwindcss'),
    typescript: await latestVersion('typescript'),
    viem: await latestVersion('viem'),
    wagmi: await latestVersion('wagmi'),
  };

  fs.writeFileSync(
    `${directory}/package.json`,
    JSON.stringify(
      {
        name: projectName,
        author: 'Seranged',
        license: 'MIT',
        version: '0.1.0',
        scripts,
        dependencies,
      },
      null,
      2,
    ),
  )
}