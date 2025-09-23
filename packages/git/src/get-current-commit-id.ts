import { runCommandSync } from "@release-change/shared";

/**
 * Gets the current commit ID.
 * @param cwd - The current working directory.
 * @return The current commit ID.
 */
export const getCurrentCommitId = (cwd: string): string => {
  const commandResult = runCommandSync("git", ["rev-parse", "HEAD"], { cwd });
  return commandResult.stdout.trim();
};
