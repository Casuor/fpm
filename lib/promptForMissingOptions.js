import inquirer from "inquirer";


export default async function promptForMissingOptions(options) {
  const defaultTemplate = "vue";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    }
  }
  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which template to use ",
      choices: ['vue', 'react', 'electron'],
      default: defaultTemplate
    })
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository? ",
      default: false
    })
  }
  if (!options.installDeps) {
    questions.push({
      type: "confirm",
      name: "installDeps",
      message: "install dependencies? ",
      default: false
    })
  }
  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    installDeps: options.installDeps || answers.installDeps
  }
}
