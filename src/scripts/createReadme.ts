export const createReadme = (walletHandler: string, linterFormatter: string) => {
    const walletUrl =
      walletHandler === 'RainbowKit'
        ? 'https://github.com/rainbow-me/rainbowkit'
        : walletHandler === 'ConnectKit'
        ? 'https://github.com/family/connectkit'
        : '#';
  
    let linterLink = '';
    let formatterLink = '';
    let romeLink = '';
  
    if (linterFormatter === 'Eslint and Prettier') {
      const [linter, formatter] = linterFormatter.split(' and ');
      const linterUrl = linter === 'Eslint' ? 'https://github.com/eslint/eslint' : '#';
      const formatterUrl = formatter === 'Prettier' ? 'https://github.com/prettier/prettier' : '#';
      linterLink = `- [${linter}](${linterUrl})`;
      formatterLink = `- [${formatter}](${formatterUrl})`;
    } else if (linterFormatter === 'Rome') {
      const romeUrl = 'https://github.com/rome/tools';
      romeLink = `- [Rome](${romeUrl})`;
    }
  
    const stack = [
      '- [Next.js](https://github.com/vercel/next.js)',
      `- [${walletHandler}](${walletUrl})`,
      linterLink,
      formatterLink,
      romeLink,
      '- [Tailwind](https://github.com/tailwindlabs/tailwindcss)',
      '- [WAGMI](https://github.com/wagmi-dev/wagmi)',
      '- [Viem](https://github.com/wagmi-dev/viem)',
      '- [Typescript](https://github.com/microsoft/TypeScript)',
    ].filter(Boolean).join('\n');
  
    return `# EVM-FE-Bootstrap Repo [![twitter URL](https://img.shields.io/twitter/url/https/twitter.com/seranged.svg?style=social&label=Follow%20%40seranged)](https://twitter.com/seranged)
    
    Thank you for using my EVM-FE-Bootstrap CLI prompter!
    
    ## Stack
    
    ${stack}
    
    ## Getting Started
    
    1. Run pnpm install to install dependencies.
    2. Create .env.local file in root and add ALCHEMY_API_KEY
    3. Run pnpm dev to begin developing.
    `;
  }