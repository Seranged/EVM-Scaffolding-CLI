import { exec } from 'child_process'

export function installDependencies(dependencies: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const pnpmInstall = exec(`pnpm install ${dependencies.join(' ')}`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
      resolve()
    })

    pnpmInstall.on('exit', (code: any) => {
      console.log(`Child exited with code ${code}`)
    })
  })
}
