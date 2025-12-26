import type { SemverOptionsLoose } from "./semver.types.js";

import { simplifyRange } from "./simplify-range.js";

/**
 * @alias simplifyRange
 */
export const simplify = (
  versions: string[],
  range: string,
  options?: SemverOptionsLoose
): string => {
  return simplifyRange(versions, range, options);
};
