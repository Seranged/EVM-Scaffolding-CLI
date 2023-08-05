const fs = require('fs');
const path = require('path');

/**
 * Modify the given scripts based on user input.
 *
 * @param {string[]} scripts - The scripts to modify.
 * @returns {Promise} - A promise that resolves when the modification is complete.
 */
export function modifyScripts(scripts: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      scripts.forEach((script) => {
        const scriptPath = path.join(__dirname, `../${script}.ts`);

        if (fs.existsSync(scriptPath)) {
          let scriptContent = fs.readFileSync(scriptPath, 'utf8');

          // Modify the script content based on your needs
          // This is just an example of adding a comment at the top of the file
          scriptContent = `// This script has been modified by EVM scaffolding CLI\n${scriptContent}`;

          fs.writeFileSync(scriptPath, scriptContent, 'utf8');
        } else {
          console.warn(`The script "${script}" does not exist.`);
        }
      });

      resolve();
    } catch (error) {
      console.error(`An error occurred while modifying scripts: ${error}`);
      reject(error);
    }
  });
}

module.exports = modifyScripts;
