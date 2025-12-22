import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { isRangeSubset } from "./is-range-subset.js";

/**
 * @alias isRangeSubset
 */
export const subset = (
  subRange: string,
  superRange: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => isRangeSubset(subRange, superRange, options);
