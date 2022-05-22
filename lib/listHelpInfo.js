
const {Command} = require('commander');
const program = new Command();


export default async function listHelpInfo(args) {

  if (Array.isArray(args) && args.length === 2) {
    args.push('--help')
  }
  program
    .description('An application for initialize a web template')
    .option('-i, --install', 'to install deps during init', 'false')
    .option('-g, --git', 'to initialize a git repo', 'false')
    .option('-y, --yes', 'skip all prompts', 'false')
    .usage('init [options]')
    .showHelpAfterError('(add --help for additional information)');

  program.parse();
}
