import { exec } from 'child_process'

/**
 * Install the given dependencies using npm.
 *
 * @param {string[]} dependencies - The dependencies to install.
 * @returns {Promise} - A promise that resolves when the installation is complete.
 */
export function installDependencies(dependencies: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const npmInstall = exec(`npm install ${dependencies.join(' ')}`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
      resolve()
    })

    npmInstall.on('exit', (code: any) => {
      console.log(`Child exited with code ${code}`)
    })
  })
}
