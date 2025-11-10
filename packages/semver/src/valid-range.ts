import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { validateRange } from "./validate-range.js";

/**
 * @alias validateRange
 */
export const validRange = (
  range: string | null | undefined,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): string | null => validateRange(range, options);
