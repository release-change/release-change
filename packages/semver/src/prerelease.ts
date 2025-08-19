import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose, SemverPrerelease } from "./semver.types.js";

import { getPrerelease } from "./get-prerelease.js";

/**
 * @alias getPrerelease
 */
export const prerelease = (
  version: string | Semver,
  options?: SemverOptionsLoose
): SemverPrerelease | null => {
  return getPrerelease(version, options);
};
