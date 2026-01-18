import type { Context } from "@release-change/shared";
import type { PushOptions } from "./git.types.js";

import { setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError, runCommand } from "@release-change/shared";

/**
 * Pushes the current branch to the remote repository.
 * @param context - The context where the CLI is running.
 * @param pushOptions - The `push` options to use (the destination branch, whether to include tags or not) when pushing.
 */
export const push = async (context: Context, pushOptions: PushOptions): Promise<void> => {
  const { config } = context;
  const { debug, remoteName } = config;
  const logger = setLogger(debug);
  logger.setScope("git");
  const { destinationBranch, includeTags } = pushOptions;
  if (!destinationBranch) {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to run the `git` command",
      message: "A branch name must be provided.",
      details: {
        output: "destinationBranch: "
      }
    });
  }
  const args = ["push", includeTags && "--follow-tags", remoteName, destinationBranch].filter(
    arg => typeof arg === "string"
  );
  const gitCommandResult = await runCommand("git", args);
  const { status, stdout, stderr } = gitCommandResult;
  if (status) {
    process.exitCode = status;
    throw formatDetailedError({
      title: "Failed to run the `git` command",
      message: `The command failed with status ${status}.`,
      details: {
        output: stderr || stdout || `Command failed with status ${status}.`,
        command: `git ${args.join(" ")}`
      }
    });
  }
  if (debug) {
    logger.setDebugScope("git:push");
    logger.logDebug(`Command run: git ${args.join(" ")}`);
    logger.logDebug(deepInspectObject(gitCommandResult));
  }
};
