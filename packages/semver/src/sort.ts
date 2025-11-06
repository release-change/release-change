import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { compareBuild } from "./compare-build.js";

/**
 * Sorts a list of versions in ascending order.
 *
 * The sort is based on comparisons between versions considering the builds.
 * @param list - The list of versions to sort.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return The sorted list of versions.
 */
export const sort = <TVersion extends string | Semver>(
  list: TVersion[],
  options?: SemverOptionsLoose
): TVersion[] => list.sort((a, b) => compareBuild(a, b, options));
