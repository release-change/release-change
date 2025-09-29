/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the Git command is run> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the Git command is run> */
import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";

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
    // TODO: uncomment to run the Git command
    // const { status, stdout, stderr } = runCommandSync("git", args, { cwd });
    if (debug) {
      logger.setDebugScope("git:cancel-commits-since-ref");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    // TODO: uncomment when the Git command is run
    // if (status) {
    //   logger.logError(`Failed to cancel the commits since ${commitRef}.`);
    //   throw new Error(stderr || stdout || `Command failed with status ${status}.`);
    // }
    logger.logSuccess(`Commits since ${commitRef} cancelled successfully.`);
  } else throw new Error("The commit reference must not be empty.");
};
