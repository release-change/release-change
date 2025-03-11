import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { runCommand } from "./run-command.js";

/**
 * Gets all tags for the branch from which the package publishes as they are on the remote repository.
 * @param context - The context where the CLI is running.
 * @return An array containing the tags if tags are found, an empty array otherwise.
 */
export const getAllTags = (context: Context): string[] => {
  const { cwd, branch, config, logger } = context;
  try {
    const gitCommandResult = runCommand(
      ["tag", "-l", "--sort=v:refname", "--merged", `${config.remoteName}/${branch}`],
      { cwd, encoding: "utf8" }
    );
    if (config.debug)
      logger.logDebug(
        inspect(gitCommandResult, { depth: Number.POSITIVE_INFINITY }),
        "git/get-all-tags"
      );
    const { status, stdout, stderr } = gitCommandResult;
    if (status || stderr) {
      throw new Error(stderr);
    }
    return stdout ? stdout.split("\n") : [];
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exitCode = 1;
    throw error;
  }
};
