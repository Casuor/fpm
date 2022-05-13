import logInfo from "../lib/logInfo";

const chalk = require("chalk");
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {projectInstall} from 'pkg-install';
import Listr from 'listr';
import copyTemplateFiles from "../lib/copyTemplateFiles";
import initGit from "../lib/initGit";

const access = promisify(fs.access);
const {log, error} = console

export default async function createProject(options) {
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
    task: async () => {
      await projectInstall({
        prefer: 'npm',
      });
    },
    // task: () =>  projectInstall({
    //   cwd: options.targetDirectory,
    // }).catch(error => {
    //   log(error)
    // }),
    // skip: () => false
    // skip: () => !options.installDeps ? `type --install/-i  to automatically install dependencies` : undefined,
  }], {
    exitOnError: false,
  })
  await tasks.run();
  logInfo(" Project Ready,DONE!")
  // log("%s Project Ready", chalk.greenBright.bold('DONE! Enioy it'));
  return true;
}
