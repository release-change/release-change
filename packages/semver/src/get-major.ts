import type { SemverOptionsLoose } from "./semver.types.js";

import { Semver } from "./classes/semver.js";

/**
 * Gets the major version of the version string.
 * @param version - The version to analyse.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The major version of the version string.
 */
export const getMajor = (version: string | Semver, options?: SemverOptionsLoose): number => {
  if (version instanceof Semver) return version.major;
  return new Semver(version, options).major;
};
