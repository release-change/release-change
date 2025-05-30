import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { setLogger } from "../logger/set-logger.js";
import { runCommand } from "../shared/run-command.js";

/**
 * Checks the authorisation to push commits to the remote repository.
 * @param repositoryUrl - The repository URL.
 * @param context - The context where the CLI is running.
 */
export const checkAuthorisation = async (
  repositoryUrl: string,
  context: Context
): Promise<void> => {
  const { branch, config } = context;
  const logger = setLogger(config.debug);
  if (!branch || !config.branches.includes(branch)) {
    logger.logInfo("Skipping authorisation checking.");
    return;
  }
  const gitCommandResult = await runCommand("git", [
    "push",
    "--dry-run",
    "--no-verify",
    repositoryUrl,
    branch
  ]);
  if (config.debug) {
    logger.setDebugScope("check-authorisation");
    logger.logDebug(inspect(gitCommandResult, { depth: Number.POSITIVE_INFINITY }));
  }
  const { status, stderr } = gitCommandResult;
  if (status) {
    process.exitCode = status;
    throw new Error(stderr);
  }
};
