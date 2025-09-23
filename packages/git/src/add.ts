import type { CommandResult } from "@release-change/shared";

import { runCommand } from "@release-change/shared";

/**
 * Adds files to the staging area.
 * @param files - The files to add.
 * @param cwd - The current working directory.
 * @return The result of the `git add` command.
 */
export const add = async (files: string[], cwd: string): Promise<CommandResult> => {
  if (!files.length) {
    process.exitCode = 1;
    throw new Error("No files to add.");
  }
  return await runCommand("git", ["add", ...files], { cwd });
};
