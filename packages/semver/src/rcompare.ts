import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { reverseCompare } from "./reverse-compare.js";

/**
 * @alias reverseCompare
 */
export const rcompare = (
  version1: string | Semver,
  version2: string | Semver,
  options?: SemverOptionsLoose
): 1 | 0 | -1 => {
  return reverseCompare(version1, version2, options);
};
