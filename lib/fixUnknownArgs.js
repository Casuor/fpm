import logInfo from "./logInfo";

export default function fixUnknownArgs(options) {
  if (!options.init) {
    logInfo("add --help or -h for additional information , buddy!", "unknown")
    process.exit(1)
  }
}
