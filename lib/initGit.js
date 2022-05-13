import execa from "execa";

export default async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.templateDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}
