import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { Range } from "./classes/range.js";

/**
 * Validate the range string.
 *
 * If the parse range is an empty string, it is replaced by `*`.
 * @param range - The range string to validate.
 * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions in the range or not, `loose`: whether to use loose mode or not).
 * @return The parsed range as a string if it is valid, `null` otherwise.
 */
export const validateRange = (
  range: string | null | undefined,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): string | null => {
  try {
    return new Range(range, options).range;
  } catch {
    return null;
  }
};
