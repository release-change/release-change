/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the Git command is run> */
import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

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
    // TODO: uncomment to run the Git command
    // const { status, stdout, stderr } = await runCommand("git", args);
    if (debug) {
      logger.setDebugScope("git:remove-tag-on-remote-repository");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    // TODO: uncomment when the Git command is run
    // if (status) {
    //   logger.logError(`Failed to remotely remove Git tag ${gitTag} on ${remoteName}.`);
    //   throw new Error(stderr || stdout || `Command failed with status ${status}.`);
    // }
    logger.logInfo(`Removed remote Git tag ${gitTag} successfully.`);
  } else throw new Error("The Git tag must not be empty.");
};
