import type { Context } from "@release-change/shared";

import { inspect } from "node:util";

import { checkErrorType, setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";

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
      ["tag", "-l", "--sort=-creatordate", "--merged", `${config.remoteName}/${branch}`],
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
