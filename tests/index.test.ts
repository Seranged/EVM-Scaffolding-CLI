import assert from 'assert';
import sinon from 'sinon';
import inquirer from 'inquirer';
import {installDependencies} from '../src/scripts/installDependencies';
import { mainFunction } from '../src/index';
import {modifyScripts} from '../src/scripts/modifyScripts';

describe('EVM Scaffolding CLI', () => {
  let promptStub: sinon.SinonStub;
  let installDependenciesStub: sinon.SinonStub;
  let modifyScriptsStub: sinon.SinonStub;

  beforeEach(() => {
    promptStub = sinon.stub(inquirer, 'prompt');
    installDependenciesStub = sinon.stub().callsFake(installDependencies as any);
    modifyScriptsStub = sinon.stub().callsFake(modifyScripts as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should install selected linter', async () => {
    promptStub.resolves({
      linter: 'ESLint+Prettier', // or 'Rome'
      dependencies: ['dependency1', 'dependency2'],
      scripts: [],
    });
  });

  it('should install selected dependencies', async () => {
    promptStub.resolves({
      dependencies: ['dependency1', 'dependency2'],
      scripts: [],
    });

    await mainFunction();

    assert(installDependenciesStub.calledWith(['dependency1', 'dependency2']));
  });

  it('should modify selected scripts', async () => {
    promptStub.resolves({
      dependencies: [],
      scripts: ['script1', 'script2'],
    });

    await mainFunction();

    assert(modifyScriptsStub.calledWith(['script1', 'script2']));
  });

  it('should handle errors gracefully', async () => {
    promptStub.rejects(new Error('Test error'));

    try {
      await mainFunction();
    } catch (error: any) {
      assert.strictEqual(error.message, 'An error occurred: Test error');
    }
  });
})

