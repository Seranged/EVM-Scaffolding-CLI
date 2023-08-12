import { exec } from 'child_process';
export function removeGitRemoteOrigin(repoPath) {
    return new Promise((resolve, reject) => {
        exec('git remote remove origin', { cwd: repoPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
            }
            else {
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolve();
            }
        });
    });
}
