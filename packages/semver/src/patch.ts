import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { getPatch } from "./get-patch.js";

/**
 * @alias getPatch
 */
export const patch = (version: string | Semver, options?: SemverOptionsLoose): number => {
  return getPatch(version, options);
};
