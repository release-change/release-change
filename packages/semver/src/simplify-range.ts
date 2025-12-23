import type { SemverOptionsLoose } from "./semver.types.js";

import { compare } from "./compare.js";
import { satisfies } from "./satisfies.js";

/**
 * Simplifies the range, creating a range including the same versions as the original.
 * @param versions - The versions to be included.
 * @param range - The original range to simplify.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The simplified range if shorter than the original one, the original range otherwise.
 */
export const simplifyRange = (
  versions: string[],
  range: string,
  options?: SemverOptionsLoose
): string => {
  const minMaxSet: [string, string | null][] = [];
  let firstVersion: string | null = null;
  let previousVersion: string | null = null;
  const sortedVersions = versions.sort((a, b) => compare(a, b, options));
  const [firstSortedVersion] = sortedVersions;
  for (const version of sortedVersions) {
    if (satisfies(version, range, options)) {
      previousVersion = version;
      if (!firstVersion) firstVersion = version;
    } else {
      if (firstVersion && previousVersion) minMaxSet.push([firstVersion, previousVersion]);
      firstVersion = null;
      previousVersion = null;
    }
  }
  if (firstVersion) minMaxSet.push([firstVersion, null]);
  const ranges: string[] = [];
  for (const [min, max] of minMaxSet) {
    if (min === max) ranges.push(min);
    else if (!max) ranges.push(min === firstSortedVersion ? "*" : `>=${min}`);
    else if (min === firstSortedVersion) ranges.push(`<=${max}`);
    else ranges.push(`${min} - ${max}`);
  }
  const simplifiedRange = ranges.join(" || ");
  return simplifiedRange.length < range.length ? simplifiedRange : range;
};
