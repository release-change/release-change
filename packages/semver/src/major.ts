import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { getMajor } from "./get-major.js";

/**
 * @alias getMajor
 */
export const major = (version: string | Semver, options?: SemverOptionsLoose): number => {
  return getMajor(version, options);
};
