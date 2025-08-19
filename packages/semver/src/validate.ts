import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { parse } from "./parse.js";

/**
 * Validates the version string.
 * @param version - The version string to validate.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The parsed version as a string if it is valid, `null` otherwise.
 */
export const validate = (
  version: string | Semver | null | undefined,
  options?: SemverOptionsLoose
): string | null => {
  const parsedVersion = parse(version, options);
  return parsedVersion ? parsedVersion.version : null;
};
