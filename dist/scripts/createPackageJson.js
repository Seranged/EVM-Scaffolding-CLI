var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs, { readFileSync } from 'fs';
import latestVersion from 'latest-version';
const packageInfo = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url)).toString());
export function createPackageJson(projectName, directory, linter) {
    return __awaiter(this, void 0, void 0, function* () {
        const scripts = {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
        };
        if (linter === 'Rome') {
            scripts.lint = 'pnpm rome check src --apply';
            scripts.format = 'pnpm rome format src --write';
        }
        else if (linter === 'ESLint and Prettier') {
            scripts.lint = 'next lint';
            scripts.format = 'prettier --write . --ignore-path .gitignore';
        }
        else if (linter === 'None') {
        }
        const dependencies = {
            '@types/node': yield latestVersion('@types/node'),
            '@types/react': yield latestVersion('@types/react'),
            '@types/react-dom': yield latestVersion('@types/react-dom'),
            autoprefixer: yield latestVersion('autoprefixer'),
            encoding: yield latestVersion('encoding'),
            next: yield latestVersion('next'),
            postcss: yield latestVersion('postcss'),
            react: yield latestVersion('react'),
            'react-dom': yield latestVersion('react-dom'),
            tailwindcss: yield latestVersion('tailwindcss'),
            typescript: yield latestVersion('typescript'),
            viem: yield latestVersion('viem'),
            wagmi: yield latestVersion('wagmi'),
            abitype: yield latestVersion('abitype'),
        };
        fs.writeFileSync(`${directory}/package.json`, JSON.stringify({
            name: projectName.toLowerCase(),
            author: 'Seranged',
            license: 'MIT',
            version: `${packageInfo.version}`,
            private: true,
            scripts,
            dependencies,
        }, null, 2));
    });
}
