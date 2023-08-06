import { exec } from 'child_process'

export function cloneRepo(repoUrl: string, branch: string, directory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`git clone -b ${branch} ${repoUrl} ${directory}`, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
