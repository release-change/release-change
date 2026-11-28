import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommand } from "@release-change/shared";

/**
 * Checks whether a Git tag exists on a remote repository.
 * @param gitTag - The name of the Git tag to check.
 * @param context - The context where the CLI is running.
 * @return `true` if the Git tag exists on the remote repository, `false` otherwise.
 */
export const isTagOnRemoteRepository = async (
  gitTag: string,
  context: Context
): Promise<boolean> => {
  const {
    cwd,
    config: { debug, remoteName }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("git");
  if (gitTag) {
    if (remoteName.startsWith("-")) {
      throw formatDetailedError({
        title: "Failed to check a Git tag on remote repository",
        message: "The remote name must not start with `-`.",
        details: { output: `gitTag: ${gitTag}` }
      });
    }
    if (gitTag.startsWith("-")) {
      throw formatDetailedError({
        title: "Failed to check a Git tag on remote repository",
        message: "The Git tag name must not start with `-`.",
        details: { output: `gitTag: ${gitTag}` }
      });
    }
    const args = ["ls-remote", "--tags", "--exit-code", remoteName, gitTag];
    const commandResult = await runCommand("git", args, { cwd });
    const { status } = commandResult;
    if (debug) {
      logger.setDebugScope("git:is-tag-on-remote-repository");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    if (status) {
      if (status === 2) {
        logger.logInfo(`Git tag ${gitTag} not found on remote repository.`);
        return false;
      }
      logger.logError(`Failed to check remote Git tag ${gitTag} on ${remoteName}.`);
      throw formatDetailedError({
        title: "Failed to run the `git ls-remote --tags` command",
        message: `The command failed with status ${status}.`,
        details: { output: `git ls-remote --tags --exit-code ${remoteName} ${gitTag}` }
      });
    }
    logger.logInfo(`Git tag ${gitTag} found on remote repository.`);
    return true;
  }
  throw formatDetailedError({
    title: "Failed to check a Git tag on remote repository",
    message: "The Git tag name must not be empty.",
    details: { output: "gitTag: " }
  });
};
