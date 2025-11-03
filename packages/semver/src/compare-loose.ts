import type { Semver } from "./classes/semver.js";

import { compare } from "./compare.js";

/**
 * Compares two versions, excluding build identifiers, in loose mode.
 * @param version1 - The first version to compare.
 * @param version2 - The second version to compare.
 * @return `0` if `version1` and `version2` are equal, `1` if `version1` is greater than `version2`, `-1` if `version2` is greater than `version1`.
 */
export const compareLoose = (version1: string | Semver, version2: string | Semver): 1 | 0 | -1 => {
  return compare(version1, version2, { loose: true });
};
