const {Command} = require('commander');
const program = new Command();


export default async function listHelpInfo(args) {


  if (args.length === 2) {
    args = args.push('--help')
  }
  program
    .description('An application for initialize a web template')
    .option('-i, --install', 'to install deps during init', 'false')
    .option('-g, --git', 'to initialize a git repo', 'false')
    .option('-y, --yes', 'skip all prompts', 'false').usage('init [options]')

  program.parse();
}
