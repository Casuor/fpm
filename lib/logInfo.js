const emoji = require('node-emoji')
const chalk = require("chalk");

const {log} = console

export default function logInfo(str) {
  log(chalk.cyan.bold(str), emoji.get('coffee'))
}

