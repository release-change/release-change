import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { checkErrorType } from "../logger/check-error-type.js";
import { setLogger } from "../logger/set-logger.js";
import { runCommandSync } from "../shared/run-command-sync.js";

/**
 * Gets all tags for the branch from which the package publishes as they are on the remote repository.
 * @param context - The context where the CLI is running.
 * @return An array containing the tags if tags are found, an empty array otherwise.
 */
export const getAllTags = (context: Context): string[] => {
  const { cwd, branch, config } = context;
  const logger = setLogger(config.debug);
  try {
    const gitCommandResult = runCommandSync(
      "git",
      ["tag", "-l", "--sort=v:refname", "--merged", `${config.remoteName}/${branch}`],
      { cwd }
    );
    if (config.debug) {
      logger.setDebugScope("git:get-all-tags");
      logger.logDebug(inspect(gitCommandResult, { depth: Number.POSITIVE_INFINITY }));
    }
    const { stdout } = gitCommandResult;
    return stdout ? stdout.split("\n") : [];
  } catch (error) {
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
