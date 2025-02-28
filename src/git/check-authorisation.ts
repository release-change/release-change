import type { Context } from "../cli/cli.types.js";

import childProcess from "node:child_process";
import { inspect, promisify } from "node:util";

import { setLogger } from "../logger/index.js";

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
  const logger = context.logger ?? setLogger();
  if (!branch || !config?.branches.includes(branch)) {
    logger.logInfo("Skipping authorisation checking");
    return;
  }
  try {
    const promisifiedExec = promisify(childProcess.exec);
    const gitCommandResult = await promisifiedExec(
      `git push --dry-run --no-verify ${repositoryUrl} ${branch}`
    );
    if (config?.debug)
      logger.logDebug(
        inspect(gitCommandResult, { depth: Number.POSITIVE_INFINITY }),
        "check-authorisation"
      );
  } catch (error) {
    process.exitCode = 1;
    throw error;
  }
};
