import chalk from "chalk";
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';
import execa from "execa";
import {projectInstall} from 'pkg-install';
import Listr from 'listr';

const access = promisify(fs.access);
const copy = promisify(ncp);
const {log, error} = console

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.templateDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

async function createProject(options) {
  options = {
    ...options, targetDirectory: options.targetDirectory || process.cwd(),
  };
  const templateName = options.template.toLowerCase();
  const templateDir = path.resolve(__dirname, `../templates/${templateName}`);
  options.templateDirectory = templateDir;
  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (e) {
    error("%s Invalid template name", chalk.red.bold('ERROR!'));
    process.exit(1);
  }

  // log('Copying template files...');
  // await copyTemplateFiles(options);
  const tasks = new Listr([{
    title: 'Copy Project Files...', task: () => {
      copyTemplateFiles(options);
    }
  }, {
    title: "Initialize Git", task: () => {
      initGit(options)
    }, enabled: () => options.git
  }, {
    title: "Install dependencies",
    task: () => projectInstall({
      cwd: options.targetDirectory,
    }),
    skip: () => !options.runInstall ? `type --install/-i  to automatically install dependencies` : undefined,
  }], {
    exitOnError: false,
  })
  await tasks.run();
  log("%s Project Ready", chalk.greenBright.bold('DONE!'));
  return true;
}

export default createProject
