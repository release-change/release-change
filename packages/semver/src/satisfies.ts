import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { Range, Semver } from "./classes/index.js";

/**
 * Tests if the version satisfies the range.
 * @param version - The version to test.
 * @param range - The range to test against.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not, `includePrerelease`: whether to include pre-release versions in the range).
 * @return `true` if the version satisfies the range, `false` otherwise.
 */
export const satisfies = (
  version: string | Semver,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => {
  try {
    return new Range(range, options).test(version instanceof Semver ? version.version : version);
  } catch {
    return false;
  }
};
