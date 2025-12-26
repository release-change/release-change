import type { Semver } from "./classes/semver.js";
import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { ltRange } from "./lt-range.js";

/**
 * @alias ltRange
 */
export const ltr = (
  version: string | Semver,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => ltRange(version, range, options);
