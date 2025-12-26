import type { SemverOptionsLoose } from "./semver.types.js";

import { getMinVersion } from "./get-min-version.js";

/**
 * @alias getMinVersion
 */
export const minVersion = (range: string, options?: SemverOptionsLoose): string | null => {
  return getMinVersion(range, options);
};
