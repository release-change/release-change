import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommand } from "@release-change/shared";

/**
 * Checks whether a branch exists on a remote repository.
 * @param branch - The name of the branch to check.
 * @param context - The context where the CLI is running.
 * @return `true` if the branch exists on the remote repository, `false` otherwise.
 */
export const isBranchOnRemoteRepository = async (
  branch: string,
  context: Context
): Promise<boolean> => {
  const {
    cwd,
    config: { debug, remoteName }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("git");
  if (branch) {
    const refsPrefix = "refs/heads/";
    const args = ["ls-remote", "--exit-code", "--", remoteName, `${refsPrefix}${branch}`];
    const commandResult = await runCommand("git", args, { cwd });
    const { status } = commandResult;
    if (debug) {
      logger.setDebugScope("git:is-branch-on-remote-repository");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    if (status) {
      if (status === 2) {
        logger.logInfo(`Branch ${branch} not found on remote repository.`);
        return false;
      }
      logger.logError(`Failed to check remote branch ${branch} on ${remoteName}.`);
      throw formatDetailedError({
        title: "Failed to run the `git ls-remote` command",
        message: `The command failed with status ${status}.`,
        details: { output: `git ls-remote --exit-code -- ${remoteName} ${refsPrefix}${branch}` }
      });
    }
    logger.logInfo(`Branch ${branch} found on remote repository.`);
    return true;
  }
  throw formatDetailedError({
    title: "Failed to check a branch on remote repository",
    message: "The branch name must not be empty.",
    details: { output: "branch: " }
  });
};
