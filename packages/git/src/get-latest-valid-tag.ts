import type { Context } from "@release-change/shared";

import { getPrerelease, validate } from "@release-change/semver";
import { formatDetailedError } from "@release-change/shared";

import { getAllTags } from "./get-all-tags.js";

import { GIT_TAG_PATTERN } from "./constants.js";

/**
 * Gets the latest valid Git tag for the branch.
 * @param context - The context where the CLI is running.
 * @param [packageName] - The name of the package for which to get the latest valid Git tag. If not provided, the latest valid Git tag for the whole repository is returned, i.e. for the root package.
 * @return The latest valid Git tag if found, `null` otherwise.
 */
export const getLatestValidTag = (context: Context, packageName?: string): string | null => {
  const { branch, config } = context;
  const gitTags = getAllTags(context)
    .filter(gitTag => validate(gitTag.replace(GIT_TAG_PATTERN, "")))
    .filter(gitTag =>
      typeof packageName === "string" ? gitTag.startsWith(packageName ? packageName : "v") : true
    );
  if (gitTags.length) {
    if (branch) {
      const branchReleaseType = config.releaseType[branch];
      if (branchReleaseType) {
        const validGitTagsForBranch = gitTags.filter(gitTag => {
          const prereleaseIdentifiers = getPrerelease(gitTag.replace(GIT_TAG_PATTERN, ""));
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
      throw formatDetailedError({
        title: "Failed to get the latest valid tag",
        message: `No release type found for the branch ${branch}.`,
        details: {
          output: `packageName: ${packageName}`
        }
      });
    }
    throw formatDetailedError({
      title: "Failed to get the latest valid tag",
      message: "No branch name found.",
      details: {
        output: `packageName: ${packageName}`
      }
    });
  }
  return null;
};
