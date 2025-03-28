import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { setLogger } from "../logger/index.js";
import { runCommandSync } from "./run-command-sync.js";

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
      ["tag", "-l", "--sort=v:refname", "--merged", `${config.remoteName}/${branch}`],
      { cwd, encoding: "utf8" }
    );
    if (config.debug) {
      logger.setDebugScope("git:get-all-tags");
      logger.logDebug(inspect(gitCommandResult, { depth: Number.POSITIVE_INFINITY }));
    }
    const { stdout } = gitCommandResult;
    return stdout ? stdout.split("\n") : [];
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exit(process.exitCode);
  }
};
