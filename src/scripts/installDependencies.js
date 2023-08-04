const { exec } = require('child_process');

/**
 * Install the given dependencies using npm.
 *
 * @param {string[]} dependencies - The dependencies to install.
 * @returns {Promise} - A promise that resolves when the installation is complete.
 */
function installDependencies(dependencies) {
  return new Promise((resolve, reject) => {
    const npmInstall = exec(
      `npm install ${dependencies.join(' ')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      },
    );

    npmInstall.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
    });
  });
}

module.exports = installDependencies;
