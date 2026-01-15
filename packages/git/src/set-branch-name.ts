import type { NextRelease } from "@release-change/shared";

import { formatDetailedError } from "@release-change/shared";

import { HEAD_BRANCH_MAX_CHARACTERS, HEAD_BRANCH_PREFIX } from "./constants.js";

/**
 * Sets the branch name for the head branch, using a prefix, the target branch and the next release data (version and/or package name).
 *
 * Due to lock file name restrictions, the branch name is limited to 244 characters (255 allowed for refs, minus the length of `refs/heads/` string).
 * @param branch - The target branch.
 * @param nextRelease - The next release data to use.
 * @return The head branch name.
 */
export const setBranchName = (branch: string | undefined, nextRelease: NextRelease): string => {
  if (branch) {
    if (nextRelease.length) {
      const headBranchBody = nextRelease
        .map(nextReleasePackage =>
          nextReleasePackage.gitTag
            .replace(/v(\d+\.\d+\.\d+)/, "$1")
            .replace(/^@/, "")
            .replace(/[@|/]/g, "-")
        )
        .join("_");
      return `${HEAD_BRANCH_PREFIX}/${branch}/${headBranchBody}`.slice(
        0,
        HEAD_BRANCH_MAX_CHARACTERS
      );
    }
    throw formatDetailedError({
      title: "Failed to set the branch name",
      message: "There must be at least one next release.",
      details: {
        output: "nextRelease.length: 0"
      }
    });
  }
  throw formatDetailedError({
    title: "Failed to set the branch name",
    message: "The target branch must be defined.",
    details: {
      output: `branch: ${branch}`
    }
  });
};
