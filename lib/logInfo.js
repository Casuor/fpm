const emoji = require('node-emoji')
const chalk = require("chalk");

const {log} = console

export default function logInfo(str, flag) {
  if (flag === "success") {
    log(chalk.cyan.bold(str), emoji.get('coffee'))
  }
  if (flag === "unknown") {
    log(chalk.grey(str), emoji.get('heart'))
  }
}

