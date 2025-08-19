import type { SemverPrerelease } from "../semver.types.js";

import { compareIdentifiers } from "./compare-identifiers.js";

/**
 * Compares two sets of prerelease identifiers.
 *
 * No prerelease identifiers are considered greater than one. A larger set of prerelease identifiers is considered greater than a smaller one.
 * @param prerelease1 - The first set of prerelease identifiers to compare.
 * @param prerelease2 - The second set of prerelease identifiers to compare.
 * @return `0` if `prerelease1` and `prerelease2` are equal, `1` if `prerelease1` is greater than `prerelease2`, `-1` if `prerelease2` is greater than `prerelease1`.
 */
export const comparePrereleases = (
  prerelease1: SemverPrerelease,
  prerelease2: SemverPrerelease
): 1 | 0 | -1 => {
  const prereleaseLength1 = prerelease1.length;
  const prereleaseLength2 = prerelease2.length;
  if (!prereleaseLength1) return !prereleaseLength2 ? 0 : 1;
  if (!prereleaseLength2) return -1;
  const prereleaseMaxLength = Math.max(prereleaseLength1, prereleaseLength2);
  for (let i = 0; i < prereleaseMaxLength; i++) {
    const a = prerelease1[i];
    const b = prerelease2[i];
    if (typeof a === "undefined") return typeof b === "undefined" ? 0 : -1;
    if (typeof b === "undefined") return 1;
    if (a === b) continue;
    return compareIdentifiers(a, b);
  }
  return 0;
};
