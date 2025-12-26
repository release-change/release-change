import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { Range } from "./classes/range.js";

/**
 * Checks if two ranges intersect.
 * @param range1 - The first version range to compare.
 * @param range2 - The second version range to compare.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not, `includePrerelease`: whether to include pre-release versions in the range).
 * @returns `true` if any of the range comparators intersect, `false` otherwise.
 */
export const intersects = (
  range1: string,
  range2: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => {
  return new Range(range1, options).intersects(new Range(range2, options));
};
