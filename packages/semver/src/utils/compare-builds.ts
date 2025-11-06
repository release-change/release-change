import type { SemverBuild } from "../semver.types.js";

import { compareIdentifiers } from "./compare-identifiers.js";

/**
 * Compares two sets of build identifiers.
 *
 * No build identifiers are considered less than one. A larger set of build identifiers is considered greater than a smaller one.
 * @param build1 - The first set of build identifiers to compare.
 * @param build2 - The second set of build identifiers to compare.
 * @return `0` if `build1` and `build2` are equal, `1` if `build1` is greater than `build2`, `-1` if `build2` is greater than `build1`.
 */
export const compareBuilds = (build1: SemverBuild, build2: SemverBuild): 1 | 0 | -1 => {
  const buildLength1 = build1.length;
  const buildLength2 = build2.length;
  if (!buildLength1) return !buildLength2 ? 0 : -1;
  if (!buildLength2) return 1;
  const buildMaxLength = Math.max(buildLength1, buildLength2);
  for (let i = 0; i < buildMaxLength; i++) {
    const a = build1[i];
    const b = build2[i];
    if (typeof a === "undefined") return typeof b === "undefined" ? 0 : -1;
    if (typeof b === "undefined") return 1;
    if (a === b) continue;
    return compareIdentifiers(a, b);
  }
  return 0;
};
