export const createReadme = (walletHandler, linterFormatter, uiKit) => {
    const walletUrl = walletHandler === 'RainbowKit'
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
    }
    else if (linterFormatter === 'Rome') {
        const romeUrl = 'https://github.com/rome/tools';
        romeLink = `- [Rome](${romeUrl})`;
    }
    let uiKitLink = '';
    if (uiKit === 'Shadcn') {
        const uiKitUrl = 'https://github.com/shadcn-ui/ui';
        uiKitLink = `- [${uiKit}](${uiKitUrl})`;
    }
    else if (uiKit === 'DaisyUI') {
        const uiKitUrl = 'https://github.com/saadeghi/daisyui';
        uiKitLink = `- [${uiKit}](${uiKitUrl})`;
    }
    const stack = [
        '- [Next.js](https://github.com/vercel/next.js)',
        `- [${walletHandler}](${walletUrl})`,
        linterLink,
        formatterLink,
        uiKitLink,
        romeLink,
        '- [Tailwind](https://github.com/tailwindlabs/tailwindcss)',
        '- [WAGMI](https://github.com/wagmi-dev/wagmi)',
        '- [Viem](https://github.com/wagmi-dev/viem)',
        '- [ABItype](https://github.com/wagmi-dev/abitype)',
        '- [Typescript](https://github.com/microsoft/TypeScript)',
    ]
        .filter(Boolean)
        .join('\n');
    return `# EVM-FE-Bootstrap [![twitter URL](https://img.shields.io/twitter/url/https/twitter.com/seranged.svg?style=social&label=Follow%20%40seranged)](https://twitter.com/seranged)
    
    Thank you for using my EVM-FE-Bootstrap CLI prompter!
    
    ## Stack
  
    ${stack}
      
    ## Getting Started
      
    1. Create .env.local file in root and add ALCHEMY_API_KEY
    2. Run pnpm dev to begin developing.
      `
        .split('\n')
        .map((line) => line.trimStart())
        .join('\n');
};
