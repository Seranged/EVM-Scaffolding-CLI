import { exec } from 'child_process';
export function cloneRepo(repoUrl, branch, directory) {
    return new Promise((resolve, reject) => {
        exec(`git clone -b ${branch} ${repoUrl} ${directory}`, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
