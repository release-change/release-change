import type { SemverOperator, SemverOptionsLoose } from "./semver.types.js";

import { Semver } from "./classes/semver.js";
import { eq } from "./eq.js";
import { gt } from "./gt.js";
import { gte } from "./gte.js";
import { lt } from "./lt.js";
import { lte } from "./lte.js";
import { neq } from "./neq.js";

/**
 * Compares two versions using an operator.
 * @param version1 - The first version to compare.
 * @param operator - The operator to use (`===`, `!==`, `==`, `!=`, `>`, `>=`, `<`, `<=`).
 * @param version2 - The second version to compare.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not).
 * @return `true` if the versions match the operator, `false` otherwise.
 */
export const compareWithOperator = (
  version1: string | Semver,
  operator: SemverOperator,
  version2: string | Semver,
  options?: SemverOptionsLoose
): boolean => {
  const strictOperator = /^[=!]={2}$/;
  const a =
    operator.match(strictOperator) && version1 instanceof Semver ? version1.version : version1;
  const b =
    operator.match(strictOperator) && version2 instanceof Semver ? version2.version : version2;
  switch (operator) {
    case "===":
      return a === b;
    case "!==":
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq(a, b, options);
    case "!=":
      return neq(a, b, options);
    case ">":
      return gt(a, b, options);
    case ">=":
      return gte(a, b, options);
    case "<":
      return lt(a, b, options);
    case "<=":
      return lte(a, b, options);
    default:
      throw new Error(`Invalid operator ${operator}.`);
  }
};
