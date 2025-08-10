import { checkErrorType, setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

/**
 * Checks whether it is a Git repository or not.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
export const isGitRepository = async (): Promise<boolean> => {
  try {
    const gitCommandResult = await runCommand("git", ["rev-parse", "--git-dir"]);
    return !gitCommandResult.status;
  } catch (error) {
    setLogger().logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
