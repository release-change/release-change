import { runCommandSync } from "@release-change/shared";

/**
 * Gets the current commit ID.
 * @return The current commit ID.
 */
export const getCurrentCommitId = (): string => {
  const commandResult = runCommandSync("git", ["rev-parse", "HEAD"]);
  return commandResult.stdout.trim();
};
