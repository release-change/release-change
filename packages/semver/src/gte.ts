import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { compare } from "./compare.js";

/**
 * Checks if the first version is greater than or equal to the second version.
 * @param version1 - The first version to compare.
 * @param version2 - The second version to compare.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return `true` if `version1` is greater than or equal to `version2`, `false` otherwise.
 */
export const gte = (
  version1: string | Semver,
  version2: string | Semver,
  options?: SemverOptionsLoose
): boolean => compare(version1, version2, options) >= 0;
