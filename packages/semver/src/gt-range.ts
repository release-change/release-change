import type { Semver } from "./classes/semver.js";
import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { isVersionOutside } from "./is-version-outside.js";

/**
 * Checks whether the version is greater than all the versions within the range.
 * @param version - The version to check.
 * @param range - The range to check against.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not, `includePrerelease`: whether to include pre-release versions in the range).
 * @return `true` if the version is greater than all the versions within the range, `false` otherwise.
 */
export const gtRange = (
  version: string | Semver,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => isVersionOutside(version, range, ">", options);
