import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose, SemverPrerelease } from "./semver.types.js";

import { parse } from "./parse.js";

/**
 * Gets the prerelease components of the version.
 * @param version - The version string to parse.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return An read-only array of prerelease components if they exist, `null` otherwise.
 */
export const getPrerelease = (
  version: string | Semver,
  options?: SemverOptionsLoose
): SemverPrerelease | null => {
  const parsedVersion = parse(version, options);
  if (parsedVersion) {
    const { prerelease } = parsedVersion;
    return prerelease.length ? prerelease : null;
  }
  return null;
};
