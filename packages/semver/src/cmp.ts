import type { Semver } from "./classes/semver.js";
import type { SemverOperator, SemverOptionsLoose } from "./semver.types.js";

import { compareWithOperator } from "./compare-with-operator.js";

/**
 * @alias compareWithOperator
 */
export const cmp = (
  version1: string | Semver,
  operator: SemverOperator,
  version2: string | Semver,
  options?: SemverOptionsLoose
) => compareWithOperator(version1, operator, version2, options);
