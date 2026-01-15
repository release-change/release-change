import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommand } from "@release-change/shared";

/**
 * Removes a Git tag on a remote repository.
 * @param gitTag - The Git tag to remove.
 * @param context - The context where the CLI is running.
 */
export const removeTagOnRemoteRepository = async (
  gitTag: string,
  context: Context
): Promise<void> => {
  const {
    config: { debug, remoteName }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("git");
  if (gitTag) {
    const args = ["push", "--delete", remoteName, gitTag];
    const { status, stdout, stderr } = await runCommand("git", args);
    if (debug) {
      logger.setDebugScope("git:remove-tag-on-remote-repository");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    if (status) {
      logger.logError(`Failed to remotely remove Git tag ${gitTag} on ${remoteName}.`);
      throw formatDetailedError({
        title: "Failed to run the `git` command",
        message: `The command failed with status ${status}.`,
        details: {
          output: stderr || stdout || `Command failed with status ${status}.`,
          command: `git ${args.join(" ")}`
        }
      });
    }
    logger.logInfo(`Removed remote Git tag ${gitTag} successfully.`);
  } else {
    throw formatDetailedError({
      title: "Failed to remove a Git tag on remote repository",
      message: "The Git tag must not be empty.",
      details: { output: "gitTag: " }
    });
  }
};
