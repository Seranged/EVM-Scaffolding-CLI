import { exec } from 'child_process';
export function installDependencies(dependencies, directory) {
    return new Promise((resolve, reject) => {
        const pnpmInstall = exec(`cd ${directory.replace('./', '')} && pnpm install ${dependencies.join(' ')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve();
        });
        pnpmInstall.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    });
}
