import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { Semver } from "./classes/semver.js";
import { compare } from "./compare.js";
import { satisfies } from "./satisfies.js";

/**
 * Gets the lowest version from the list which satisfies the range.
 * @param versions - The list of versions.
 * @param range - The range to match against.
 * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
 * @return The lowest version from the list if there is one satisfying the range, `null` otherwise.
 */
export const getMinSatisfyingVersion = (
  versions: ReadonlyArray<string | Semver>,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): string | null => {
  let minVersion: string | null = null;
  for (const version of versions) {
    const versionToTest = version instanceof Semver ? version.version : version;
    if (satisfies(versionToTest, range, options)) {
      if (!minVersion || compare(minVersion, versionToTest, options) === 1) {
        minVersion = versionToTest;
      }
    }
  }
  return minVersion;
};
