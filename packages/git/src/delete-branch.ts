import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";

/**
 * Deletes a branch.
 * @param branch - The name of the branch to delete.
 * @param cwd - The current working directory.
 * @param [debug] - Whether the CLI is running in debug mode or not.
 */
export const deleteBranch = (branch: string, cwd: string, debug = false): void => {
  const logger = setLogger(debug);
  logger.setScope("git");
  if (branch) {
    const args = ["branch", "-D", branch];
    const { status } = runCommandSync("git", args, { cwd });
    if (debug) {
      logger.setDebugScope("git:delete-branch");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    if (status) logger.logError(`Failed to delete branch ${branch}.`);
    else logger.logInfo(`Deleted branch ${branch}.`);
  } else {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to delete a branch",
      message: "The branch name must not be empty.",
      details: { output: "branch: " }
    });
  }
};
