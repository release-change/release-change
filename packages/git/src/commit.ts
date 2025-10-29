import type { CommandResult } from "@release-change/shared";

import { formatDetailedError, runCommand } from "@release-change/shared";

/**
 * Commits the changes.
 * @param message - The commit message.
 * @param cwd - The current working directory.
 * @return The result of the `git commit` command.
 */
export const commit = async (message: string, cwd: string): Promise<CommandResult> => {
  if (!message) {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to run the `git` command",
      message: "The commit message cannot be empty.",
      details: {
        output: "message: "
      }
    });
  }
  return await runCommand("git", ["commit", "-m", message], { cwd });
};
