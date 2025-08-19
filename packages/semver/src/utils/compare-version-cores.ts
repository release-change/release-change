import type { SemverVersionComponents } from "../semver.types.js";

import { compareIdentifiers } from "./compare-identifiers.js";

/**
 * Compares two version cores.
 *
 * The version cores are compared in the following order: major, minor and patch.
 * @param versionCore1 - The first version core to compare.
 * @param versionCore2 - The second version core to compare.
 * @return `0` if `versionCore1` and `versionCore2` are equal, `1` if `versionCore1` is greater than `versionCore2`, `-1` if `versionCore2` is greater than `versionCore1`.
 */
export const compareVersionCores = (
  versionCore1: Omit<SemverVersionComponents, "prerelease" | "build">,
  versionCore2: Omit<SemverVersionComponents, "prerelease" | "build">
): 1 | 0 | -1 => {
  const { major: majorA, minor: minorA, patch: patchA } = versionCore1;
  const { major: majorB, minor: minorB, patch: patchB } = versionCore2;
  return (
    compareIdentifiers(majorA, majorB) ||
    compareIdentifiers(minorA, minorB) ||
    compareIdentifiers(patchA, patchB)
  );
};
