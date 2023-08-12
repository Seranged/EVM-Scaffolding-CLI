import { exec } from 'child_process';
export function cloneRepo(repoUrl, directory) {
    return new Promise((resolve, reject) => {
        exec(`git clone ${repoUrl} ${directory}`, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
