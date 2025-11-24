import type { Semver } from "./classes/semver.js";
import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { getMinSatisfyingVersion } from "./get-min-satisfying-version.js";

/**
 * @alias getMinSatisfyingVersion
 */
export const minSatisfying = (
  versions: ReadonlyArray<string | Semver>,
  range: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): string | null => getMinSatisfyingVersion(versions, range, options);
