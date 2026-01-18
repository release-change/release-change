import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";

/**
 * Cancels the commits since the commit reference.
 * @param commitRef - The reference of the commit after which all the commits are to be cancelled.
 * @param cwd - The current working directory.
 * @param [debug] - Whether the CLI is running in debug mode or not.
 */
export const cancelCommitsSinceRef = (commitRef: string, cwd: string, debug = false): void => {
  const logger = setLogger(debug);
  logger.setScope("git");
  if (commitRef) {
    const args = ["reset", "--hard", commitRef];
    const { status, stdout, stderr } = runCommandSync("git", args, { cwd });
    if (debug) {
      logger.setDebugScope("git:cancel-commits-since-ref");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    if (status) {
      logger.logError(`Failed to cancel the commits since ${commitRef}.`);
      throw formatDetailedError({
        title: "Failed to run the `git reset` command",
        message: `The command failed with status ${status}.`,
        details: {
          output: stderr || stdout || `Command failed with status ${status}.`,
          command: `git ${args.join(" ")}`
        }
      });
    }
    logger.logInfo(`Commits since ${commitRef} cancelled.`);
  } else {
    throw formatDetailedError({
      title: "Failed to cancel commits",
      message: "The commit reference must not be empty.",
      details: { output: "commitRef: " }
    });
  }
};
