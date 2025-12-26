import type { Semver } from "./classes/semver.js";
import type {
  SemverHighLowDirection,
  SemverOptionsIncludePrerelease,
  SemverOptionsLoose
} from "./semver.types.js";

import { isVersionOutside } from "./is-version-outside.js";

/**
 * @alias isVersionOutside
 */
export const outside = (
  version: string | Semver,
  range: string,
  highLowDirection: SemverHighLowDirection,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => isVersionOutside(version, range, highLowDirection, options);
