import inquirer from "inquirer";
import fixUnknownArgs from "./fixUnknownArgs";

export default async function chooseTepmlateSource(options) {
  const defaultSource = "local"
  const defaultTemplate = "vue";
  const questions = [];

  fixUnknownArgs(options)

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      source: options.source || defaultSource,
    }
  }

  //确认初始化模板的位置
  if (!options.source) {
    questions.push({
      type: "list",
      name: "source",
      message: "Please select a template source",
      choices: ['local', 'remote'],
      default: defaultSource
    })
  }

  const answers = await inquirer.prompt(questions);
  if (answers.source === "remote") {
    process.exit(1)
  }
  return {
    ...options,
    source: options.source || answers.source,
  }
}
