import type { Semver } from "./classes/semver.js";
import type { SemverOptionsLoose } from "./semver.types.js";

import { reverseSort } from "./reverse-sort.js";

/**
 * @alias reverseSort
 */
export const rsort = <TVersion extends string | Semver>(
  list: TVersion[],
  options?: SemverOptionsLoose
): TVersion[] => reverseSort(list, options);
