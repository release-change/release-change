import { formatDetailedError, runCommandSync } from "@release-change/shared";

/**
 * Switches to another branch.
 * @param branch - The name of the branch.
 * @param cwd - The current working directory.
 */
export const switchToBranch = (branch: string, cwd: string): void => {
  if (branch) runCommandSync("git", ["switch", branch], { cwd });
  else {
    throw formatDetailedError({
      title: "Failed to switch to another branch",
      message: "The branch name cannot be empty.",
      details: {
        output: `branch: ${branch}`
      }
    });
  }
};
