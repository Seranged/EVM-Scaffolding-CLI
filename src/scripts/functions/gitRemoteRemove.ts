import { exec } from 'child_process'

export function removeGitRemoteOrigin() {
  exec('git remote remove origin', (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

