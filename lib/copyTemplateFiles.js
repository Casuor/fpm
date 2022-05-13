import {promisify} from "util";
import ncp from "ncp";

const copy = promisify(ncp);


export default async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}
