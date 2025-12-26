import type { Semver } from "./classes/semver.js";
import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { gtRange } from "./gt-range.js";

/**
 * @alias gtRange
 */
export const gtr = (
  version: string | Semver,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => gtRange(version, range, options);
