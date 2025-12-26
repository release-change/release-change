import type {
  SemverComparatorData,
  SemverOptionsIncludePrerelease,
  SemverOptionsLoose
} from "../semver.types.js";

import { gt } from "../gt.js";
import { gte } from "../gte.js";
import { lt } from "../lt.js";
import { lte } from "../lte.js";
import { satisfies } from "../satisfies.js";

/**
 * Checks whether a simple range (single comparator set) is a subset of another simple range.
 *
 * A range is considered a subset when all versions that satisfy the subrange also satisfy the super range. This means the subrange must be more restrictive (or equally restrictive) than the super range.
 *
 * The following rules are applied:
 * - the compatibility between operators is checked (e.g.: `>=1.0.0` vs `>=0.5.0`, `=1.0.0` vs `>=1.0.0 <2.0.0`);
 * - in case of multiple comparators, lower and upper bounds are extracted and compared from both ranges (e.g.: `>=1.0.0 <2.0.0` vs `>=0.5.0 <3.0.0`);
 * - exact versions are treated as both lower and upper bounds;
 * - `>=X <=X` is treated as equivalent to `=X`;
 * - impossible ranges (e.g.: `1.0.0 <1.0.0`) are recognised as empty sets, which are subsets of any range;
 * - when not in pre-release mode, the subrange and the super range are incompatible if the subrange contains pre-release versions but the super range does not;
 * - a subrange without a lower/upper bound is less restrictive than a super range with one and is thus not a subset.
 * @param subSet - The subrange comparator set.
 * @param superSet - The super range comparator set.
 * @param [options] - The options to use (`loose`: whether to use loose mode or not, `includePrerelease`: whether to include pre-release versions in the range).
 * @return `true` if the subrange set is a subset of the super range set, `false` otherwise.
 */
export const isSimpleRangeSubset = (
  subSet: SemverComparatorData[],
  superSet: SemverComparatorData[],
  options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
): boolean => {
  const { includePrerelease } = options ?? {};
  if (subSet.length === 1 && superSet.length === 1) {
    const [subComparator] = subSet;
    const [superComparator] = superSet;
    if (!subComparator || !superComparator) return false;
    const { operator: subOperator, semver: subSemver } = subComparator;
    const { operator: superOperator, semver: superSemver } = superComparator;
    const { version: subVersion } = subSemver;
    const { version: superVersion } = superSemver;
    if (!includePrerelease) {
      const { prerelease: subPrerelease } = subSemver;
      const { prerelease: superPrerelease } = superSemver;
      if (subPrerelease.length && !superPrerelease.length) return false;
    }
    if ((!subOperator || subOperator === "=") && (!superOperator || superOperator === "=")) {
      return subVersion === superVersion;
    }
    if (!subOperator || subOperator === "=") {
      return satisfies(subVersion, superComparator.value, options);
    }
    if (subOperator === ">=" && superOperator === ">=") {
      return gte(subVersion, superVersion, options);
    }
    if (subOperator === ">" && superOperator === ">=") {
      return gt(subVersion, superVersion, options) || subVersion === superVersion;
    }
    if (subOperator === ">" && superOperator === ">") {
      return gte(subVersion, superVersion, options);
    }
    if (subOperator === "<=" && superOperator === "<=") {
      return lte(subVersion, superVersion, options);
    }
    if (subOperator === "<" && superOperator === "<=") {
      return lt(subVersion, superVersion, options) || subVersion === superVersion;
    }
    if (subOperator === "<" && superOperator === "<") {
      return lte(subVersion, superVersion, options);
    }
    if (
      subOperator === ">=" &&
      (superOperator === ">" || superOperator === "<" || superOperator === "<=")
    ) {
      return false;
    }
    if (subOperator === ">" && (superOperator === "<" || superOperator === "<=")) {
      return false;
    }
    if (
      (subOperator === "<=" || subOperator === "<") &&
      (superOperator === ">" || superOperator === ">=")
    ) {
      return false;
    }
    return false;
  }
  let subLowerBound: SemverComparatorData | null = null;
  let subUpperBound: SemverComparatorData | null = null;
  let superLowerBound: SemverComparatorData | null = null;
  let superUpperBound: SemverComparatorData | null = null;
  for (const comparator of subSet) {
    const { operator } = comparator;
    if (operator === ">=" || operator === ">") {
      subLowerBound = comparator;
    } else if (operator === "<=" || operator === "<") {
      subUpperBound = comparator;
    } else if (!operator || operator === "=") {
      subLowerBound = comparator;
      subUpperBound = comparator;
    }
  }
  for (const comparator of superSet) {
    const { operator } = comparator;
    if (operator === ">=" || operator === ">") {
      superLowerBound = comparator;
    } else if (operator === "<=" || operator === "<") {
      superUpperBound = comparator;
    } else if (!operator || operator === "=") {
      superLowerBound = comparator;
      superUpperBound = comparator;
    }
  }
  if (!includePrerelease && subLowerBound && superLowerBound) {
    const subHasPrerelease = Boolean(subLowerBound.semver.prerelease.length);
    const superHasPrerelease = Boolean(superLowerBound.semver.prerelease.length);
    if (subHasPrerelease !== superHasPrerelease) return false;
  }
  if (
    subLowerBound &&
    subUpperBound &&
    subLowerBound !== subUpperBound &&
    (subLowerBound.operator === "" || subLowerBound.operator === "=")
  ) {
    const exactVersion = subLowerBound.semver.version;
    if (
      subUpperBound.operator === "<" &&
      !lt(exactVersion, subUpperBound.semver.version, options)
    ) {
      return true;
    }
    if (
      subUpperBound.operator === ">" &&
      !gt(exactVersion, subUpperBound.semver.version, options)
    ) {
      return true;
    }
    if (
      subUpperBound.operator === "<=" &&
      gt(exactVersion, subUpperBound.semver.version, options)
    ) {
      return true;
    }
    if (
      subUpperBound.operator === ">=" &&
      lt(exactVersion, subUpperBound.semver.version, options)
    ) {
      return true;
    }
  }
  if (
    subLowerBound &&
    subUpperBound &&
    subLowerBound.operator === ">=" &&
    subUpperBound.operator === "<=" &&
    subLowerBound.semver.version === subUpperBound.semver.version
  ) {
    if (superSet.length === 1) {
      const [superComparator] = superSet;
      if (superComparator && (!superComparator.operator || superComparator.operator === "=")) {
        return subLowerBound.semver.version === superComparator.semver.version;
      }
    }
    return satisfies(
      subLowerBound.semver.version,
      superSet.map(comparator => comparator.value).join(" "),
      options
    );
  }
  if (subLowerBound && superLowerBound) {
    const {
      operator: subOperator,
      semver: { version: subVersion }
    } = subLowerBound;
    const {
      operator: superOperator,
      semver: { version: superVersion }
    } = superLowerBound;
    if (subOperator === ">=" && superOperator === ">=") {
      if (lt(subVersion, superVersion, options)) return false;
    } else if (subOperator === ">" && superOperator === ">=") {
      if (lte(subVersion, superVersion, options)) return false;
    } else if (subOperator === ">=" && superOperator === ">") {
      if (lte(subVersion, superVersion, options)) return false;
    } else if (subOperator === ">" && superOperator === ">") {
      if (lt(subVersion, superVersion, options)) return false;
    } else if (
      (!subOperator || subOperator === "=") &&
      (superOperator === ">=" || superOperator === ">")
    ) {
      if (!satisfies(subVersion, superLowerBound.value, options)) return false;
    }
  } else if (!subLowerBound && superLowerBound) {
    return false;
  }
  if (subUpperBound && superUpperBound) {
    const {
      operator: subOperator,
      semver: { version: subVersion }
    } = subUpperBound;
    const {
      operator: superOperator,
      semver: { version: superVersion }
    } = superUpperBound;
    if (subOperator === "<=" && superOperator === "<=") {
      if (gt(subVersion, superVersion, options)) return false;
    } else if (subOperator === "<" && superOperator === "<=") {
      if (gte(subVersion, superVersion, options)) return false;
    } else if (subOperator === "<=" && superOperator === "<") {
      if (gte(subVersion, superVersion, options)) return false;
    } else if (subOperator === "<" && superOperator === "<") {
      if (gt(subVersion, superVersion, options)) return false;
    } else if (
      (subOperator === "" || subOperator === "=") &&
      (superOperator === "<=" || superOperator === "<")
    ) {
      if (!satisfies(subVersion, superUpperBound.value, options)) return false;
    }
  } else if (!subUpperBound && superUpperBound) {
    return false;
  }
  return true;
};
