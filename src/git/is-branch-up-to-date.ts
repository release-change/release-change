import { runCommandSync } from "../shared/run-command-sync.js";
import { getRemoteName } from "./get-remote-name.js";

/**
 * Checks if the branch from which the CLI running is going to publish is up to date.
 * @param branch - The branch from which the CLI running is going to publish.
 * @return `true` if the branch is up to date, `false` otherwise.
 */
export const isBranchUpToDate = async (branch: string): Promise<boolean> => {
  if (branch) {
    const remoteName = await getRemoteName();
    if (remoteName) {
      runCommandSync("git", ["fetch", remoteName]);
      const comparedCommits = runCommandSync("git", [
        "rev-list",
        `@{u}..${remoteName}/${branch}`
      ]).stdout;
      return !comparedCommits;
    }
    return false;
  }
  return false;
};
