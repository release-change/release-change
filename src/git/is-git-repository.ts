import { runCommand } from "./run-command.js";

/**
 * Checks whether it is a Git repository or not.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
export const isGitRepository = async (): Promise<boolean> => {
  const gitCommandResult = await runCommand(["rev-parse", "--git-dir"]);
  return !gitCommandResult.status;
};
