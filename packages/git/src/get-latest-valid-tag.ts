import type { Context } from "@release-change/shared";

import { getPrerelease, validate } from "@release-change/semver";

import { getAllTags } from "./get-all-tags.js";

/**
 * Gets the latest valid Git tag for the branch.
 * @param context - The context where the CLI is running.
 * @return The latest valid Git tag if found, `null` otherwise.
 */
export const getLatestValidTag = (context: Context): string | null => {
  const { branch, config } = context;
  const gitTags = getAllTags(context).filter(gitTag => validate(gitTag.replace(/^v/, "")));
  if (gitTags.length) {
    if (branch) {
      const branchReleaseType = config.releaseType[branch];
      if (branchReleaseType) {
        const validGitTagsForBranch = gitTags.filter(gitTag => {
          const prereleaseIdentifiers = getPrerelease(gitTag.replace(/^v/, ""));
          if (branchReleaseType.prerelease) {
            if (prereleaseIdentifiers) {
              const [prereleaseIdentifier] = prereleaseIdentifiers;
              return prereleaseIdentifier === branchReleaseType.prereleaseIdentifier;
            }
            return false;
          }
          return !prereleaseIdentifiers;
        });
        const [gitTag] = validGitTagsForBranch;
        return gitTag ?? null;
      }
      throw new Error(`Failed to get the release type for the branch ${branch}.`);
    }
    throw new Error("Failed to get the branch name.");
  }
  return null;
};
