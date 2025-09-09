import type { CommandResult } from "@release-change/shared";

import { runCommand } from "@release-change/shared";

/**
 * Commits the changes.
 * @param message - The commit message.
 * @return The result of the `git commit` command.
 */
export const commit = async (message: string): Promise<CommandResult> => {
  if (!message) {
    process.exitCode = 1;
    throw new Error("The commit message cannot be empty.");
  }
  return await runCommand("git", ["commit", "-m", message]);
};
