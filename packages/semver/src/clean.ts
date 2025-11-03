import type { SemverOptionsLoose } from "./semver.types.js";

import { parse } from "./parse.js";

/**
 * Cleans the version, removing the `v` and `=` prefixes and leading and trailing whitespace.
 * @param version - The version string to clean.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The cleaned and parsed version if it is valid, `null` otherwise.
 */
export const clean = (version: string, options?: SemverOptionsLoose) => {
  const parsedVersion = parse(version.trim().replace(/^[v=]+/, ""), options);
  return parsedVersion ? parsedVersion.version : null;
};
