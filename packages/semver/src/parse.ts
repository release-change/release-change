import type { SemverData, SemverOptionsLoose } from "./semver.types.js";

import { Semver } from "./classes/semver.js";

/**
 * Parses a version string.
 * @param version - The version string to parse (if it is a `Semver` instance, it is returned as is).
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return As is if the version is already a `Semver` instance, a `Semver` instance if the version string is valid, `null` otherwise.
 */
export const parse = (
  version: string | Semver | null | undefined,
  options?: SemverOptionsLoose
): SemverData | null => {
  if (version instanceof Semver) return version.toData();
  try {
    return new Semver(version, options).toData();
  } catch {
    return null;
  }
};
