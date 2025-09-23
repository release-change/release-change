import { checkErrorType, setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

/**
 * Checks whether it is a Git repository or not.
 * @param cwd - The current working directory.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
export const isGitRepository = async (cwd: string): Promise<boolean> => {
  try {
    const gitCommandResult = await runCommand("git", ["rev-parse", "--git-dir"], { cwd });
    return !gitCommandResult.status;
  } catch (error) {
    setLogger().logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
