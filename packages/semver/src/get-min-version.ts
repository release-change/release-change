import type { SemverOptionsLoose } from "./semver.types.js";

import { Range } from "./classes/range.js";
import { Semver } from "./classes/semver.js";
import { gt } from "./gt.js";
import { increase } from "./increase.js";
import { satisfies } from "./satisfies.js";

/**
 * Gets the lowest version which can possibly match the given range.
 * @param range - The range to match against.
 * @param options - The options to use (`loose`: whether to use loose mode or not).
 * @return The lowest version matching the given range if found, `null` otherwise.
 */
export const getMinVersion = (range: string, options?: SemverOptionsLoose): string | null => {
  const zeroVersions = ["0.0.0", "0.0.0-0"];
  for (const zeroVersion of zeroVersions) {
    if (satisfies(zeroVersion, range, options)) return zeroVersion;
  }
  let minVersion: string | null = null;
  for (const comparators of new Range(range, options).set) {
    let minVersionSet: string | null = null;
    for (const comparator of comparators) {
      const { operator, semver } = comparator;
      let comparatorVersion = semver;
      const { prerelease } = comparatorVersion;
      if (operator !== "<" && operator !== "<=") {
        if (operator === ">") {
          if (prerelease.length)
            comparatorVersion = new Semver(
              `${semver.major}.${semver.minor}.${semver.patch}-${semver.prerelease.join(".")}.0`
            );
          else comparatorVersion = new Semver(increase(semver.version, "patch"));
        }
        if (!minVersionSet || gt(comparatorVersion.version, minVersionSet)) {
          minVersionSet = comparatorVersion.version;
        }
      }
    }
    if (minVersionSet && (!minVersion || gt(minVersion, minVersionSet))) minVersion = minVersionSet;
  }
  return minVersion && satisfies(minVersion, range) ? minVersion : null;
};
