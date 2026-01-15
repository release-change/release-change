import { formatDetailedError, runCommandSync } from "@release-change/shared";

/**
 * Switches to a new branch.
 * @param newBranch - The name of the new branch.
 * @param cwd - The current working directory.
 * @returns The result of the `git switch` command.
 */
export const switchToNewBranch = (newBranch: string, cwd: string): void => {
  if (newBranch) runCommandSync("git", ["switch", "-c", newBranch], { cwd });
  else {
    throw formatDetailedError({
      title: "Failed to switch to a new branch",
      message: "The new branch name cannot be empty.",
      details: {
        output: `newBranch: ${newBranch}`
      }
    });
  }
};
