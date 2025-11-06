import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { getMinor } from "./get-minor.js";

/**
 * @alias getMinor
 */
export const minor = (version: string | Semver, options?: SemverOptionsLoose): number => {
  return getMinor(version, options);
};
