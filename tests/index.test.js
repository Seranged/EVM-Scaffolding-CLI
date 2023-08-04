const assert = require('assert');
const sinon = require('sinon');
const inquirer = require('inquirer');
const installDependencies = require('../src/scripts/installDependencies');
const modifyScripts = require('../src/scripts/modifyScripts');
const main = require('../src/index');

describe('EVM Scaffolding CLI', () => {
  beforeEach(() => {
    sinon.stub(inquirer, 'prompt');
    sinon.stub(installDependencies, 'installDependencies');
    sinon.stub(modifyScripts, 'modifyScripts');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should install selected linter', async () => {
    inquirer.prompt.resolves({
      linter: 'ESLint+Prettier', // or 'Rome'
      dependencies: ['dependency1', 'dependency2'],
      scripts: [],
    });

  it('should install selected dependencies', async () => {
    inquirer.prompt.resolves({
      dependencies: ['dependency1', 'dependency2'],
      scripts: [],
    });

    await main();

    assert(installDependencies.installDependencies.calledWith(['dependency1', 'dependency2']));
  });

  it('should modify selected scripts', async () => {
    inquirer.prompt.resolves({
      dependencies: [],
      scripts: ['script1', 'script2'],
    });

    await main();

    assert(modifyScripts.modifyScripts.calledWith(['script1', 'script2']));
  });

  it('should handle errors gracefully', async () => {
    inquirer.prompt.rejects(new Error('Test error'));

    try {
      await main();
    } catch (error) {
      assert.strictEqual(error.message, 'An error occurred: Test error');
    }
  });
});
