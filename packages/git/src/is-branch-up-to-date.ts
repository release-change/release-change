import type { Context } from "@release-change/shared";

import { runCommandSync } from "@release-change/shared";

import { getRemoteName } from "./get-remote-name.js";

/**
 * Checks if the branch from which the CLI running is going to publish is up to date.
 * @param branch - The branch from which the CLI running is going to publish.
 * @param context - The context where the CLI is running.
 * @return `true` if the branch is up to date, `false` otherwise.
 */
export const isBranchUpToDate = async (branch: string, context: Context): Promise<boolean> => {
  if (branch) {
    const remoteName = await getRemoteName(context);
    if (remoteName) {
      runCommandSync("git", ["fetch", remoteName], { cwd: context.cwd });
      const comparedCommits = runCommandSync("git", ["rev-list", `@{u}..${remoteName}/${branch}`], {
        cwd: context.cwd
      }).stdout;
      return !comparedCommits;
    }
    return false;
  }
  return false;
};
