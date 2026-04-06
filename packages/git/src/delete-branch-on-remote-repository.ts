import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  formatOutputFromCommandResult,
  runCommand
} from "@release-change/shared";

/**
 * Deletes a branch on a remote repository.
 * @param branch - The name of the branch to delete.
 * @param context - The context where the CLI is running.
 */
export const deleteBranchOnRemoteRepository = async (
  branch: string,
  context: Context
): Promise<void> => {
  const {
    config: { debug, remoteName }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("git");
  if (branch) {
    const args = ["push", "--delete", remoteName, branch];
    const commandResult = await runCommand("git", args);
    const { status } = commandResult;
    if (debug) {
      logger.setDebugScope("git:delete-branch-on-remote-repository");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    if (status) {
      logger.logError(`Failed to remotely delete branch ${branch} on ${remoteName}.`);
      throw formatDetailedError({
        title: "Failed to run the `git push` command",
        message: `The command failed with status ${status}.`,
        details: {
          output: formatOutputFromCommandResult(commandResult),
          command: `git ${args.join(" ")}`
        }
      });
    }
    logger.logInfo(`Deleted remote branch ${branch} successfully.`);
  } else {
    throw formatDetailedError({
      title: "Failed to delete a branch on remote repository",
      message: "The branch name must not be empty.",
      details: { output: "branch: " }
    });
  }
};
