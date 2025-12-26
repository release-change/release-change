import type { Semver } from "./classes/semver.js";
import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { getMaxSatisfyingVersion } from "./get-max-satisfying-version.js";

/**
 * @alias getMaxSatisfyingVersion
 */
export const maxSatisfying = (
  versions: ReadonlyArray<string | Semver>,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): string | null => getMaxSatisfyingVersion(versions, range, options);
