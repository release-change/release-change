import type { Semver } from "./classes/semver.js";
import type {
  SemverComparatorData,
  SemverHighLowDirection,
  SemverOptionsIncludePrerelease,
  SemverOptionsLoose
} from "./semver.types.js";

import { Range } from "./classes/range.js";
import { gt } from "./gt.js";
import { gte } from "./gte.js";
import { lt } from "./lt.js";
import { lte } from "./lte.js";
import { satisfies } from "./satisfies.js";

/**
 * Checks whether the version is outside the bounds of the range in either the high or the low direction.
 * @param version - The version to check.
 * @param range - The range to check against.
 * @param highLowDirection - The direction to check: `>` for the high direction, `<` for the low direction.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not, `includePrerelease`: whether to include pre-release versions in the range).
 * @return `true` if the version is outside the bounds of the range, `false` otherwise.
 */
export const isVersionOutside = (
  version: string | Semver,
  range: string,
  highLowDirection: SemverHighLowDirection,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => {
  if (!range || range === "*" || satisfies(version, range, options)) return false;
  const higherThan = highLowDirection === ">" ? gt : lt;
  const lowerThan = highLowDirection === ">" ? lt : gt;
  const lowerThanOrEqual = highLowDirection === ">" ? lte : gte;
  const hiloOperator = highLowDirection === ">" ? ">" : "<";
  const hiloOperatorWithEqual = highLowDirection === ">" ? ">=" : "<=";
  for (const comparators of new Range(range, options).set) {
    let high: SemverComparatorData | null = null;
    let low: SemverComparatorData | null = null;
    for (const comparator of comparators) {
      high ??= comparator;
      low ??= comparator;
      if (higherThan(comparator.semver.version, high.semver.version)) high = comparator;
      else if (lowerThan(comparator.semver.version, low.semver.version)) low = comparator;
    }
    if (high?.operator === hiloOperator || high?.operator === hiloOperatorWithEqual) return false;
    if (low) {
      if (
        (!low.operator || low.operator === hiloOperator) &&
        lowerThanOrEqual(version, low.semver.version, options)
      )
        return false;
      if (low.operator === hiloOperatorWithEqual && lowerThan(version, low.semver.version, options))
        return false;
    }
  }
  return true;
};
