import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { validate } from "./validate.js";

/**
 * @alias validate
 */
export const valid = (
  version: string | Semver | null | undefined,
  options?: SemverOptionsLoose
) => {
  return validate(version, options);
};
