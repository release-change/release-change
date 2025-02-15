import { exec } from "node:child_process";

/**
 * Checks whether it is a Git repository or not.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
const isGitRepository = async (): Promise<boolean> => {
  const getCode = (): Promise<number> => {
    return new Promise(resolve => {
      const gitCommand = exec("git rev-parse --git-dir");
      gitCommand.on("exit", code => {
        resolve(code ?? 0);
      });
      gitCommand.on("error", () => {
        resolve(1);
      });
    });
  };
  const exitCode = await getCode();
  return exitCode === 0;
};

export default isGitRepository;
