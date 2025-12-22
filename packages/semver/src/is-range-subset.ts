import type { SemverOptionsIncludePrerelease, SemverOptionsLoose } from "./semver.types.js";

import { Range } from "./classes/range.js";
import { isSimpleRangeSubset } from "./utils/is-simple-range-subset.js";

/**
 * Checks whether the subrange is a subset of the super range.
 *
 * Any subrange is a subset of itself and of `*` (an empty super range is treated like `*`).
 *
 * A complex range `r1 || r2 || …` is a subset of `R1 || R2 || …` if one of the following is true:
 * - every simple range `r1, r2, …` is a `null` set,
 * - every simple range `r1, r2, …` not being a `null` set is a subset of some `R1, R2, …`.
 *
 * Whether a simple range `c1 c2 …` is a subset of `C1 C2 …` follows the following rules:
 * - when the subrange is any range (`*`):
 *   - it is a subset if the super range is also any range,
 *   - `*` is treated as `>=0.0.0-0` and checked recursively when in pre-release mode and if the super range is not any range,
 *   - `*` is treated as `>=0.0.0` and checked recursively when not in pre-release mode and if the super range is not any range;
 * - when the super range is any range (`*`):
 *   - any subrange is a subset when in pre-release mode,
 *   - the subrange is checked against `>=0.0.0` (to exclude pre-release versions) when not in pre-release mode;
 * - when both ranges have a single comparator:
 *   - `a` and `=a` are subsets of `=A` iff `a === A`,
 *   - `a` and `=a` are subsets of any `<operator> A` iff `a` satisfies `<operator> A`,
 *   - `>=a` is a subset of `>=A` iff `a >= A`,
 *   - `>a` is a subset of `>=A` iff `a > A` or `a === A`,
 *   - `>a` is a subset of `>A` iff `a >= A`,
 *   - `<=a` is a subset of `<=A` iff `a <= A`,
 *   - `<a` is a subset of `<=A` iff `a < A` or `a === A`,
 *   - `<a` is a subset of `<A` iff `a <= A`,
 *   - lower bound operators (`>=`, `>`) are incompatible with upper bound operators (`<`, `<=`);
 * - when ranges contain multiple comparators, lower and upper bounds are extracted and compared:
 *   - it is not a subset if the subrange has a lower bound but the super range does not,
 *   - it is not a subset if the subrange has an upper bound but the super range does not,
 *   - the subrange lower bound must be at least as restrictive as the super range lower bound,
 *   - the subrange upper bound must be at least as restrictive as the super range upper bound;
 * - `a` and `=a` in a multi-comparator context are treated as both lower and upper bound;
 * - `>=a <=a` is equivalent to `=a`,
 * - impossible ranges (e.g.: `=a <a`) are detected and considered subsets of any range;
 * - when not in pre-release mode, ranges with different pre-release presence in their lower bounds are incompatible.
 * @param subRange - The subrange to check.
 * @param superRange - The super range to check against.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not, `includePrerelease`: whether to include pre-release versions in the range).
 * @return `true` if the subrange is a subset of the super range, `false` otherwise.
 */
export const isRangeSubset = (
  subRange: string,
  superRange: string,
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => {
  if (subRange === superRange) return true;
  const subRangeObject = new Range(subRange, options);
  const superRangeObject = new Range(superRange, options);
  if (subRangeObject.range === superRangeObject.range) return true;
  const { includePrerelease } = options ?? {};
  const minimumRange = ">=0.0.0";
  const minimumRangeWithPrerelease = ">=0.0.0-0";
  const nullSetRange = "<0.0.0-0";
  const hasOnlyNullSets = subRangeObject.set.every(set => {
    const [firstComparator] = set;
    return set.length === 1 && firstComparator && firstComparator.value === nullSetRange;
  });
  if (hasOnlyNullSets) return true;
  for (const superRangeSet of superRangeObject.set) {
    const [superFirstComparator] = superRangeSet;
    if (superRangeSet.length === 1 && superFirstComparator && !superFirstComparator.value) {
      if (includePrerelease) return true;
      return isRangeSubset(subRange, minimumRange, options);
    }
  }
  for (const subRangeSet of subRangeObject.set) {
    const [subFirstComparator] = subRangeSet;
    if (subRangeSet.length === 1 && subFirstComparator && !subFirstComparator.value) {
      for (const superRangeSet of superRangeObject.set) {
        const [superFirstComparator] = superRangeSet;
        if (superRangeSet.length === 1 && superFirstComparator && !superFirstComparator.value) {
          return true;
        }
      }
      if (includePrerelease) return isRangeSubset(minimumRangeWithPrerelease, superRange, options);
      return isRangeSubset(minimumRange, superRange, options);
    }
    if (subFirstComparator && subFirstComparator.value === nullSetRange) continue;
    let isSubsetOfAnySuperRange = false;
    for (const superRangeSet of superRangeObject.set) {
      if (isSimpleRangeSubset(subRangeSet, superRangeSet, options)) {
        isSubsetOfAnySuperRange = true;
        break;
      }
    }
    if (!isSubsetOfAnySuperRange) return false;
  }
  return true;
};
