import type { NextRelease } from "@release-change/shared";

/**
 * Find the NPM tag from a Git tag.
 * @param gitTag - The Git tag to use.
 * @param nextRelease - The next release data where to find the NPM tag for the given Git tag.
 * @return The NPM tag if the Git tag is included in next release data and the NPM tag is defined, `undefined` if the NPM tag is not defined, `null` otherwise.
 */
export const findNpmTagFromGitTag = (
  gitTag: string,
  nextRelease: NextRelease
): string | undefined | null => {
  const packageNextRelease = nextRelease.find(
    packageNextRelease => packageNextRelease.gitTag === gitTag
  );
  return packageNextRelease ? packageNextRelease.npmTag : null;
};
