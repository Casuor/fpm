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

  const tasks = new Listr([
    {
      title: 'Copy Project Files...', task: () => {
        copyTemplateFiles(options);
      }
    },
    {
      title: "Initialize Git", task: () => {
        initGit(options)
      },
      enabled: () => options.git
    },
    {
      title: "Install dependencies",
      task: async () => {
        await projectInstall({
          cwd: options.targetDirectory,
        });
      },
      skip: () => options.installDeps ? false : `$type --install/-i  to automatically install dependencies`
    }], {
    exitOnError: false,
  })
  await tasks.run();
  logInfo(" Project Ready,DONE! Enjoy it!", 'success')
  return true;
}
