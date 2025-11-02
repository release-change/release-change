import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { compare } from "./compare.js";

/**
 * Compares two versions, excluding build identifiers, sorting in descending order.
 * @param version1 - The first version to compare.
 * @param version2 - The second version to compare.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return `0` if `version1` and `version2` are equal, `1` if `version2` is greater than `version1`, `-1` if `version1` is greater than `version2`.
 */
export const reverseCompare = (
  version1: string | Semver,
  version2: string | Semver,
  options?: SemverOptionsLoose
): 1 | 0 | -1 => {
  return compare(version2, version1, options);
};
