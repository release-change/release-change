import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose, SemverReleaseType } from "./semver.types.js";

import { getDifference } from "./get-difference.js";

/**
 * @alias getDifference
 */
export const diff = (
  version1: string | Semver,
  version2: string | Semver,
  options?: SemverOptionsLoose
): SemverReleaseType | null => getDifference(version1, version2, options);
