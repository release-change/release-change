import type { CommandResult } from "@release-change/shared";

import { formatDetailedError, runCommand } from "@release-change/shared";

/**
 * Adds files to the staging area.
 * @param files - The files to add.
 * @param cwd - The current working directory.
 * @return The result of the `git add` command.
 */
export const add = async (files: string[], cwd: string): Promise<CommandResult> => {
  if (!files.length) {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to run the `git` command",
      message: "No files to add.",
      details: {
        output: "files.length: 0"
      }
    });
  }
  return await runCommand("git", ["add", ...files], { cwd });
};
