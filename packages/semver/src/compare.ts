import type { SemverOptionsLoose } from "./semver.types.js";

import { Semver } from "./classes/semver.js";
import { comparePrereleases } from "./utils/compare-prereleases.js";
import { compareVersionCores } from "./utils/compare-version-cores.js";

/**
 * Compares two versions, excluding build identifiers.
 * @param version1 - The first version to compare.
 * @param version2 - The second version to compare.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return `0` if `version1` and `version2` are equal, `1` if `version1` is greater than `version2`, `-1` if `version2` is greater than `version1`.
 */
export const compare = (
  version1: string | Semver,
  version2: string | Semver,
  options?: SemverOptionsLoose
): 1 | 0 | -1 => {
  const a = version1 instanceof Semver ? version1 : new Semver(version1, options).toData();
  const b = version2 instanceof Semver ? version2 : new Semver(version2, options).toData();
  const { version: versionA } = a;
  const { version: versionB } = b;
  if (versionA === versionB) return 0;
  const versionCoreA = { major: a.major, minor: a.minor, patch: a.patch };
  const versionCoreB = { major: b.major, minor: b.minor, patch: b.patch };
  const prereleaseA = a.prerelease;
  const prereleaseB = b.prerelease;
  return (
    compareVersionCores(versionCoreA, versionCoreB) || comparePrereleases(prereleaseA, prereleaseB)
  );
};
