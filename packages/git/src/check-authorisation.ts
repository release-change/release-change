import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import {
  deepInspectObject,
  formatDetailedError,
  formatOutputFromCommandResult,
  runCommand
} from "@release-change/shared";

/**
 * Checks the authorisation to push commits to the remote repository.
 * @param repositoryUrl - The repository URL.
 * @param context - The context where the CLI is running.
 */
export const checkAuthorisation = async (
  repositoryUrl: string,
  context: Context
): Promise<void> => {
  const { cwd, branch, config } = context;
  const logger = setLogger(config.debug);
  logger.setScope("git");
  if (!branch || !config.branches.includes(branch)) {
    logger.logInfo("Skipping authorisation checking.");
    return;
  }
  const args = ["push", "--dry-run", "--no-verify", repositoryUrl, branch];
  const commandResult = await runCommand("git", args, { cwd });
  if (config.debug) {
    logger.setDebugScope("git:check-authorisation");
    logger.logDebug(deepInspectObject(commandResult));
  }
  const { status } = commandResult;
  if (status) {
    process.exitCode = status;
    throw formatDetailedError({
      title: "Failed to run the `git push` command",
      message: `The command failed with status ${status}.`,
      details: {
        output: formatOutputFromCommandResult(commandResult),
        command: `git ${args.join(" ")}`
      }
    });
  }
};
