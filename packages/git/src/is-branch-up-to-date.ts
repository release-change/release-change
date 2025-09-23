import { runCommandSync } from "@release-change/shared";

import { getRemoteName } from "./get-remote-name.js";

/**
 * Checks if the branch from which the CLI running is going to publish is up to date.
 * @param branch - The branch from which the CLI running is going to publish.
 * @param cwd - The current working directory.
 * @return `true` if the branch is up to date, `false` otherwise.
 */
export const isBranchUpToDate = async (branch: string, cwd: string): Promise<boolean> => {
  if (branch) {
    const remoteName = await getRemoteName(cwd);
    if (remoteName) {
      runCommandSync("git", ["fetch", remoteName], { cwd });
      const comparedCommits = runCommandSync("git", ["rev-list", `@{u}..${remoteName}/${branch}`], {
        cwd
      }).stdout;
      return !comparedCommits;
    }
    return false;
  }
  return false;
};
