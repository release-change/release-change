import type { Context } from "../cli/cli.types.js";

import semver from "semver";

import { getAllTags } from "./get-all-tags.js";

/**
 * Gets latest valid Git tag for the branch.
 * @param context - The context where the CLI is running.
 * @return The latest valid Git tag if found, `null` otherwise.
 */
export const getLatestValidTag = (context: Context): string | null => {
  const { branch, config } = context;
  const gitTags = getAllTags(context).filter(gitTag => semver.valid(gitTag));
  if (gitTags.length) {
    if (branch) {
      const branchReleaseType = config.releaseType[branch];
      if (branchReleaseType) {
        const validGitTagsForBranch = gitTags.filter(gitTag => {
          const prereleaseIdentifiers = semver.prerelease(gitTag);
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
