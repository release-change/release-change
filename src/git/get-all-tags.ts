import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";
import { spawnSync } from "node:child_process";

import { setLogger } from "../logger/index.js";

/**
 * Gets all tags for the branch from which the package publishes as they are on the remote repository.
 * @param context - The context where the CLI is running.
 * An array containing the tags if tags are found, an empty array otherwise, false if the package cannot publish from the branch.
 */
export const getAllTags = (context: Context): string[] | false => {
  const { cwd, branch, config } = context;
  const logger = context.logger ?? setLogger();
  if (!branch || !config?.branches.includes(branch)) return false;
  try {
    const gitCommandResult = spawnSync(
      "git",
      ["tag", "-l", "--sort=v:refname", "--merged", `${config?.remoteName}/${branch}`],
      { cwd, encoding: "utf8" }
    );
    if (config?.debug)
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
