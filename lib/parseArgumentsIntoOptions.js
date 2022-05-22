import arg from "arg";

export default function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({
    '--git': Boolean,
    '--yes': Boolean,
    '--install': Boolean,
    '-g': '--git',
    '-y': '--yes',
    '-i': '--install',
  }, {argv: rawArgs.slice(2),});
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    init: args._[0] === "init",
    template: args._[1] || undefined,
    source: args._[2] || undefined,
    installDeps: args['--install'] || false,
  }
}
