import {Command} from "commander";

const {log, error} = console
const program = new Command();

export default async function help(args) {
  // program
  //   .option('-f, --force', 'force installation')
  //   .option('-i,--install','install deps')


  program.parse(args);

  if (!args.length) {
    error('packages required');
    process.exit(1);
  }

  if (program.opts().force) console.log('  force: install');
  args.forEach(function (args) {
    log('  install : %s', args);
  });
}
