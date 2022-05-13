import createProject from "./createProject";
import checkNodeVersion from '../lib/checkNodeVersion'
import parseArgumentsIntoOptions from "../lib/parseArgumentsIntoOptions";
import promptForMissingOptions from "../lib/promptForMissingOptions";
import listHelpInfo from "../lib/listHelpInfo";


export async function cli(args) {
  await listHelpInfo(args)
  // checkNodeVersion();
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options)
}
