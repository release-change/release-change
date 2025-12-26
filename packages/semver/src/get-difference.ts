import type { SemverOptionsLoose, SemverReleaseType } from "./semver.types.js";

import { Semver } from "./classes/semver.js";
import { compare } from "./compare.js";
import { compareVersionCores } from "./utils/compare-version-cores.js";

/**
 * Gets the difference between two versions.
 *
 * When the lower version has a pre-release identifier and the higher does not, the release type returned is:
 * - always `major` if the lower version has a major only (e.g.: `2.0.0-alpha.1` compared to `2.0.0`, `2.0.0-alpha.1` compared to `3.0.0`),
 * - `minor` if both versions share the same version core and the lower version has a minor and no patch (e.g.: `1.3.0-rc.1` compared to `1.3.0`),
 * - `patch` if both versions share the same version core and the lower version has a patch (e.g.: `1.2.3-rc.1` compared to `1.2.3`).
 * @param version1 - The first version to compare.
 * @param version2 - The second version to compare.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The release type making the difference if both versions are different, `null` otherwise.
 */
export const getDifference = (
  version1: string | Semver,
  version2: string | Semver,
  options?: SemverOptionsLoose
): SemverReleaseType | null => {
  const a = version1 instanceof Semver ? version1 : new Semver(version1, options);
  const b = version2 instanceof Semver ? version2 : new Semver(version2, options);
  const comparison = compare(a, b);
  if (comparison) {
    const isVersion1Greater = comparison === 1;
    const highVersion = isVersion1Greater ? a : b;
    const lowVersion = isVersion1Greater ? b : a;
    const isHighVersionPrerelease = Boolean(highVersion.prerelease.length);
    const isLowVersionPrerelease = Boolean(lowVersion.prerelease.length);
    if (!isHighVersionPrerelease && isLowVersionPrerelease) {
      const { minor, patch } = lowVersion;
      if (!minor && !patch) return "major";
      if (!compareVersionCores(highVersion, lowVersion)) {
        if (minor && !patch) return "minor";
        return "patch";
      }
    }
    const { major: majorA, minor: minorA, patch: patchA } = a;
    const { major: majorB, minor: minorB, patch: patchB } = b;
    const prefix = isHighVersionPrerelease ? "pre" : "";
    if (majorA !== majorB) return `${prefix}major`;
    if (minorA !== minorB) return `${prefix}minor`;
    if (patchA !== patchB) return `${prefix}patch`;
    return "prerelease";
  }
  return null;
};
