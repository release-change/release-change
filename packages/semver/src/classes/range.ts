import type {
  SemverComparatorData,
  SemverData,
  SemverOptionsIncludePrerelease,
  SemverOptionsLoose,
  SemverRangeData
} from "../semver.types.js";

import { Comparator } from "./comparator.js";
import { Semver } from "./semver.js";

import {
  CARET_COMPARATOR_PATTERN,
  CARET_PATTERN,
  CARET_PATTERN_LOOSE,
  PARTIAL_COMPARATOR_PATTERN,
  PARTIAL_COMPARATOR_PATTERN_LOOSE,
  PARTIAL_PATTERN,
  PARTIAL_PATTERN_LOOSE,
  RANGE_OPERATORS_PATTERN,
  SPACE_FOLLOWED_COMPARATORS_PATTERN,
  TILDE_COMPARATOR_PATTERN,
  TILDE_PATTERN,
  TILDE_PATTERN_LOOSE,
  VALID_SEMVER_PATTERN,
  VALID_SEMVER_PATTERN_LOOSE
} from "../constants.js";

/**
 * `Range` object.
 */
export class Range implements SemverRangeData {
  raw = "";
  range = "";
  includePrerelease = false;
  set: SemverComparatorData[][] = [];
  options: SemverOptionsLoose & SemverOptionsIncludePrerelease = {};

  /**
   * Creates a new `Range` instance.
   * @param range - The range string.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   */
  constructor(range: string, options?: SemverOptionsLoose & SemverOptionsIncludePrerelease) {
    this.options = options ?? {};
    this.raw = range;
    this.includePrerelease = Boolean(options?.includePrerelease);
    const sanitisedRange = this.reduceWhitespaces(range);
    this.set = this.formatSet(
      sanitisedRange.split("||").map(range => this.parseRange(range.trim(), options))
    );
    if (!this.set.length) throw new Error(`Invalid range ${this.raw}.`);
    this.range = this.formatRange(this.set);
  }

  /**
   * Reduces the whitespaces in a string.
   *
   * The purpose is to avoid relying on regular expressions like `\s*`, which can potentially be slow.
   * @param string - The string to reduce.
   * @return The string with the whitespaces reduced to a single space each or stripped if following a range operator.
   */
  reduceWhitespaces(string: string): string {
    return string.trim().replace(/\s+/g, " ").replace(SPACE_FOLLOWED_COMPARATORS_PATTERN, "$1");
  }

  /**
   * Checks whether a comparator has a range value of `<0.0.0-0` (i.e. a null set).
   * @param comparator - The comparator to check.
   * @return `true` if the range value is `<0.0.0-0`, `false` otherwise.
   */
  isNullSet(comparator: SemverComparatorData | undefined): boolean {
    return comparator ? comparator.value === "<0.0.0-0" : false;
  }

  /**
   * Checks whether a comparator has an empty range value (i.e. an any-version set).
   * @param comparator - The comparator to check.
   * @return `true` if the range value is empty, `false` otherwise.
   */
  isAnyVersionSet(comparator: SemverComparatorData | undefined): boolean {
    return comparator ? !comparator.value : false;
  }

  /**
   * Checks whether a version is a complete version (with major, minor and patch), according to the mode used.
   * @param version - The version to check.
   * @param loose - Whether the mode used is loose (`true`) or strict (`false`).
   * @return `true` if the version is complete, `false` otherwise.
   */
  isValidCompleteVersion(version: string, loose: boolean): boolean {
    return Boolean(version.match(loose ? VALID_SEMVER_PATTERN_LOOSE : VALID_SEMVER_PATTERN));
  }

  /**
   * Formats the `set` property.
   *
   * The formatting follows the following rules:
   * - if any comparators are not null sets, null sets are removed;
   * - in case all comparators are null sets, the first one is kept;
   * - if any comparators have an any-version set, the comparator set is an any-version set.
   * @param comparatorSet - The comparator set to use.
   * @return The formatted `set` property.
   */
  formatSet(comparatorSet: SemverComparatorData[][]): SemverComparatorData[][] {
    if (comparatorSet.length) {
      const [firstComparator] = comparatorSet;
      const set = comparatorSet.filter(comparators => !this.isNullSet(comparators[0]));
      if (set.length) {
        for (const comparators of set) {
          if (comparators.length === 1 && this.isAnyVersionSet(comparators[0])) {
            return [comparators];
          }
        }
        return comparatorSet;
      }
      return firstComparator ? [firstComparator] : [];
    }
    throw new Error(`Invalid range ${this.raw}.`);
  }

  /**
   * Formats the `range` property.
   *
   * Any empty value from a comparator is replaced by `*`.
   * @param comparatorSet - The formatted comparator set to use.
   * @return The formatted `range` property.
   */
  formatRange(comparatorSet: SemverComparatorData[][]): string {
    return comparatorSet
      .map(comparators =>
        comparators
          .map(comparator => {
            const { value } = comparator;
            return value || "*";
          })
          .join(" ")
      )
      .join("||");
  }

  /**
   * Replaces hyphen-separated ranges by a range with a greater-than-or-equal operator, on the left side, and a less-than or less-than-or-equal operator, on the right side.
   *
   * The replacement follows the following rules:
   * - concerning the left range:
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with minor and patch at `0`, (e.g.: `1`, `1.x` and `1.x.x` become `>=1.0.0`);
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with patch at `0`, (e.g.: `1.2` and `1.2.x` become `>=1.2.0`);
   *    - a complete version range (major, minor and patch) is replaced by a range greater than or equal to this version (e.g.: `1.2.3` becomes `>=1.2.3`);
   * - concerning the right range:
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range less than the next pre-major version (e.g.: `3`, `3.x` and `3.x.x` become `<4.0.0-0`);
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range less than the next pre-minor version (e.g.: `3.4` and `3.4.x` become `<3.5.0-0`);
   *    - a complete version range (major, minor and patch) is replaced by a range less or equal to this version (e.g.: `3.4.5` becomes `<=3.4.5`);
   * - a range consisting of just an `x` is replaced by `*`;
   * - any prerelease identifiers are kept, even tough the `includePrerelease` option is set to `false` or not declared.
   * @param comparator - The range string with a comparator to parse.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return A string containing the range the appropriate operators if a hyphen is present, the original string otherwise.
   */
  replaceHyphens(
    comparator: string,
    options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
  ): string {
    const { loose, includePrerelease } = options ?? {};
    const hyphenSeparator = / - /;
    return comparator.match(hyphenSeparator)
      ? comparator
          .trim()
          .split(" - ")
          .map((comparator, index) => {
            const match = comparator.match(loose ? PARTIAL_PATTERN_LOOSE : PARTIAL_PATTERN);
            if (!match || !match.groups) return `${index ? "<=" : ">="}${comparator}`;
            if (comparator.match(/^x$/i)) return "*";
            const { major, minor, patch, prerelease } = match.groups;
            const digitsOnly = /^\d+$/;
            const isMinorNumeric = minor?.match(digitsOnly);
            const isPatchNumeric = patch?.match(digitsOnly);
            const operator = index
              ? includePrerelease || !isMinorNumeric || !isPatchNumeric
                ? "<"
                : "<="
              : ">=";
            const newMajor = index
              ? !isMinorNumeric && !isPatchNumeric
                ? Number(major) + 1
                : Number(major)
              : Number(major) || 0;
            const newMinor = index
              ? isMinorNumeric
                ? !isPatchNumeric
                  ? Number(minor) + 1
                  : Number(minor)
                : 0
              : Number(minor) || 0;
            const newPatch = index
              ? isPatchNumeric
                ? includePrerelease
                  ? Number(patch) + 1
                  : Number(patch)
                : 0
              : Number(patch) || 0;
            const newPrerelease = prerelease
              ? `-${prerelease}`
              : (index && !isPatchNumeric) || includePrerelease
                ? "-0"
                : "";
            return `${operator}${newMajor}.${newMinor}.${newPatch}${newPrerelease}`;
          })
          .join(" ")
      : comparator;
  }

  /**
   * Replaces a range beginning with a tilde, whether followed by a right arrow or not, by a range with greater-than-or-equal and less-than operators.
   *
   * The replacement follows the following rules:
   * - a range consisting of just a tilde, whether followed by a right arrow or not, is replaced by `*`;
   * - a tilde followed by a single major-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with minor and patch at `0`, and less than the next pre-major version;
   * - a tilde followed by a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with patch at `0`, and less than the next pre-minor version;
   * - a tilde followed by a complete version range (major, minor and patch) is replaced by a range greater than or equal to this version and less than the next pre-minor version;
   * - a tilde followed by a zero-version range is replaced by a range greater than or equal to this version and less than the next pre-minor version;
   * - any prerelease identifiers are kept, even tough the `includePrerelease` option is set to `false` or not declared.
   * @example
   * `~2`, `~2.x`, `~2.x.x`, `~>2`, `~>2.x` and `~>2.x.x` become `>=2.0.0 <3.0.0-0`,
   * `~2.0`, `~2.0.x`, "~>2.0"` and `~>2.0.x` become `>=2.0.0 <2.1.0-0`,
   * `~1.2`, `~1.2.x`, `~>1.2` and `~>1.2.x` become `>=1.2.0 <1.3.0-0`,
   * `~1.2.3` and `~>1.2.3` become `>=1.2.3 <1.3.0-0`,
   * `~1.2.0` and `~>1.2.0` become `>=1.2.0 <1.3.0-0`,
   * `~0.0.1` and `~>0.0.1` become `>=0.0.1 <0.1.0-0`,
   * `~1.2.3-beta.4` and `~>1.2.3-beta.4` become `>=1.2.3-beta.4 <1.3.0-0`.
   * @param comparator - The range string with a comparator to parse.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return A string containing the range with greater-than-or-equal and less-than operators if a tilde is present, the original string otherwise.
   */
  replaceTildes(comparator: string, options?: SemverOptionsLoose): string {
    const { loose } = options ?? {};
    return comparator
      .trim()
      .split(" ")
      .map(comparator => {
        if (comparator.match(new RegExp(`^${TILDE_COMPARATOR_PATTERN}$`))) return "*";
        const match = comparator.match(loose ? TILDE_PATTERN_LOOSE : TILDE_PATTERN);
        if (!match || !match.groups) return comparator;
        const { major, minor, patch, prerelease } = match.groups;
        const digitsOnly = /^\d+$/;
        const isMajorNumeric = major?.match(digitsOnly);
        const isMinorNumeric = minor?.match(digitsOnly);
        const isPatchNumeric = patch?.match(digitsOnly);
        const completeVersion = comparator.replace(TILDE_COMPARATOR_PATTERN, "");
        if (
          isMajorNumeric &&
          isMinorNumeric &&
          isPatchNumeric &&
          !this.isValidCompleteVersion(completeVersion, Boolean(loose))
        ) {
          throw new Error(`Invalid range \`${comparator}\`.`);
        }
        const isMajorOnlyDefined =
          major && (!minor || !isMinorNumeric) && (!patch || !isPatchNumeric);
        const lowMajor = Number(major) || 0;
        const lowMinor = Number(minor) || 0;
        const lowPatch = Number(patch) || 0;
        const lowPrerelease = prerelease ? `-${prerelease}` : "";
        const highMajor = isMajorOnlyDefined ? lowMajor + 1 : lowMajor;
        const highMinor = isMajorOnlyDefined ? 0 : lowMinor + 1;
        const highPatch = 0;
        return `>=${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease} <${highMajor}.${highMinor}.${highPatch}-0`;
      })
      .join(" ");
  }

  /**
   * Replaces a range beginning with a caret by a range with greater-than-or-equal and less-than operators.
   *
   * The replacement follows the following rules:
   * - a range consisting of just a caret is replaced by `*`;
   * - a range consisting of a caret followed by an `x` is replaced by `*`;
   * - a caret followed by a single major-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with minor and patch at `0`, and less than the next pre-major version;
   * - a caret followed by a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with patch at `0`, and less than the next pre-major version;
   * - a caret followed by a complete version range (major, minor and patch) is replaced by a range greater than or equal to this version and less than the next pre-major version;
   * - a caret followed by a single zero-version range is replaced by a range less than the next pre-major version;
   * - a caret followed by a zero-version range with minor at `0` is replaced by a range greater than or equal to this version and less than the next pre-patch version;
   * - a caret followed by a complete zero-version range is replaced by a range greater than or equal to this version and less than the next pre-minor version;
   * - any prerelease identifiers are kept, even tough the `includePrerelease` option is set to `false` or not declared.
   * @example
   * `^2`, `^2.x` and `^2.x.x` become `>=2.0.0 <3.0.0-0`,
   * `^2.0` and `^2.0.x` become `>=2.0.0 <3.0.0-0`,
   * `^1.2` and `^1.2.x` become `>=1.2.0 <2.0.0-0`,
   * `^1.2.3` becomes `>=1.2.3 <2.0.0-0`,
   * `^1.2.0` becomes `>=1.2.0 <2.0.0-0`,
   * `^0` becomes `<1.0.0-0"`,
   * `^0.0.1` becomes `>=0.0.1 <0.0.2-0`,
   * `^0.1.0` becomes `>=0.1.0 <0.2.0-0`,
   * `^1.2.3-beta.4` becomes `>=1.2.3-beta.4 <2.0.0-0`.
   * @param comparator - The range string with a comparator to parse.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return A string containing the range with greater-than-or-equal and less-than operators if a caret is present, the original string otherwise.
   */
  replaceCarets(comparator: string, options?: SemverOptionsLoose): string {
    const { loose } = options ?? {};
    return comparator
      .trim()
      .split(" ")
      .map(comparator => {
        if (comparator === "^" || comparator.match(/^\^x/i)) return "*";
        if (comparator === "^0") return "<1.0.0-0";
        const match = comparator.match(loose ? CARET_PATTERN_LOOSE : CARET_PATTERN);
        if (!match || !match.groups) return comparator;
        const { major, minor, patch, prerelease } = match.groups;
        const completeVersion = comparator.replace(CARET_COMPARATOR_PATTERN, "");
        if (
          major &&
          minor &&
          patch &&
          !this.isValidCompleteVersion(completeVersion, Boolean(loose))
        ) {
          throw new Error(`Invalid range \`${comparator}\`.`);
        }
        const lowMajor = Number(major) || 0;
        const lowMinor = Number(minor) || 0;
        const lowPatch = Number(patch) || 0;
        const lowPrerelease = prerelease ? `-${prerelease}` : "";
        const highMajor = lowMajor ? lowMajor + 1 : 0;
        const highMinor = lowMajor ? 0 : lowMinor ? lowMinor + 1 : 0;
        const highPatch = lowMajor ? 0 : lowMinor ? 0 : lowPatch + 1;
        return `>=${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease} <${highMajor}.${highMinor}.${highPatch}-0`;
      })
      .join(" ");
  }

  /**
   * Replaces a range containing X-ranges with a range with greater-than-or-equal and/or less-than operators.
   *
   * The replacement follows the following rules:
   * - without any operator or with the `=` operator:
   *    - a range consisting of just an `x` or a `*` is replaced by `*`;
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with minor and patch at `0`, and less than the next pre-major version;
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with patch at `0`, and less than the next pre-minor version;
   * - if the operator is greater-than:
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to the next major version;
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to the next minor version;
   * - if the operator is greater-than-or-equal:
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with minor and patch at `0`;
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range greater than or equal to this version, with patch at `0`;
   * - if the operator is less-than:
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range less than this pre-major version;
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range less than this pre-minor version;
   * - if the operator is less-than-or-equal:
   *    - a single major-version range, whether completed by an `x` or not, is replaced by a range less than or equal to the next major version, with minor and patch at `0`;
   *    - a major-and-minor-version range, whether completed by an `x` or not, is replaced by a range less than or equal to the next minor version, with patch at `0`;
   * - any prerelease identifiers are kept, even tough the `includePrerelease` option is set to `false` or not declared.
   * @example
   * `2`, `2.x`, `2.x.x`, `=2`, `=2.x` and `=2.x.x` become `>=2.0.0 <3.0.0-0`,
   * `1.2`, `1.2.x`, `1.2` and `1.2.x` become `>=1.2.0 <1.3.0-0`,
   * `>2`, `>2.x` and `>2.x.x` become `>=3.0.0`,
   * `>1.2` and `>1.2.x` become `>=1.3.0`,
   * `>=2`, `>=2.x` and `>=2.x.x` become `>=2.0.0`,
   * `>=1.2` and `>=1.2.x` become `>=1.2.0`,
   * `<2`, `<2.x` and `<2.x.x` become `<2.0.0-0`,
   * `<1.2` and `<1.2.x` become `<1.2.0-0`,
   * `<=2`, `<=2.x` and `<=2.x.x` become `<3.0.0-0`,
   * `<=1.2` and `<=1.2.x` become `<1.3.0-0`.
   * @param comparator - The range string with a comparator to parse.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return A string containing the range with greater-than-or-equal and/or less-than operators if partial versions are present, the original string otherwise.
   */
  replaceXRanges(
    comparator: string,
    options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
  ): string {
    const { loose, includePrerelease } = options ?? {};
    return comparator
      .trim()
      .split(" ")
      .map(comparator => {
        const match = comparator.match(
          loose ? PARTIAL_COMPARATOR_PATTERN_LOOSE : PARTIAL_COMPARATOR_PATTERN
        );
        if (!match || !match.groups) return comparator;
        const { operator, major, minor, patch, prerelease } = match.groups;
        const digitsOnly = /^\d+$/;
        const isMajorNumeric = major?.match(digitsOnly);
        const isMinorNumeric = minor?.match(digitsOnly);
        const isPatchNumeric = patch?.match(digitsOnly);
        const completeVersion = comparator.replace(RANGE_OPERATORS_PATTERN, "");
        if (isMajorNumeric && isMinorNumeric && isPatchNumeric) {
          if (!this.isValidCompleteVersion(completeVersion, Boolean(loose))) {
            throw new Error(`Invalid range \`${comparator}\`.`);
          }
          return loose
            ? `${operator}${Number(major)}.${Number(minor)}.${Number(patch)}${prerelease ? `-${prerelease}` : ""}`
            : comparator;
        }
        const lowPatch = 0;
        switch (operator) {
          case ">": {
            if (!isMajorNumeric) return "<0.0.0-0";
            const lowMajor = isMinorNumeric ? Number(major) : Number(major) + 1;
            const lowMinor = isMinorNumeric ? Number(minor) + 1 : 0;
            const lowPrerelease = prerelease ? `-${prerelease}` : includePrerelease ? "-0" : "";
            return `>=${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease}`;
          }
          case ">=": {
            if (!isMajorNumeric) return "*";
            const lowMajor = Number(major);
            const lowMinor = isMinorNumeric ? Number(minor) : 0;
            const lowPrerelease = prerelease ? `-${prerelease}` : includePrerelease ? "-0" : "";
            return `>=${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease}`;
          }
          case "<": {
            if (!isMajorNumeric) return "<0.0.0-0";
            const lowMajor = Number(major);
            const lowMinor = isMinorNumeric ? Number(minor) : 0;
            const lowPrerelease = prerelease ? `-${prerelease}` : "-0";
            return `<${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease}`;
          }
          case "<=": {
            if (!isMajorNumeric) return "*";
            const lowMajor = isMinorNumeric ? Number(major) : Number(major) + 1;
            const lowMinor = isMinorNumeric ? Number(minor) + 1 : 0;
            const lowPrerelease = prerelease ? `-${prerelease}` : "-0";
            return `<=${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease}`;
          }
          default: {
            if (!isMajorNumeric) return "*";
            const lowMajor = Number(major) || 0;
            const lowMinor = isMinorNumeric ? Number(minor) || 0 : 0;
            const lowPrerelease = prerelease ? `-${prerelease}` : includePrerelease ? "-0" : "";
            const highMajor = isMinorNumeric ? lowMajor : lowMajor + 1;
            const highMinor = isMinorNumeric ? lowMinor + 1 : 0;
            const highPatch = 0;
            return `>=${lowMajor}.${lowMinor}.${lowPatch}${lowPrerelease} <${highMajor}.${highMinor}.${highPatch}-0`;
          }
        }
      })
      .join(" ");
  }

  /**
   * Removes the stars from a comparator.
   *
   * `*` is related with everything else in the comparator as logical “and” and an empty string means “any version”.
   * @param comparator - The range string with a comparator to parse.
   * @return A string containing the range without stars.
   */
  removeStars(comparator: string): string {
    return comparator.trim().replaceAll("*", "");
  }

  /**
   * Parses a string beginning with a comparator.
   * @param comparator - The range string with a comparator to parse.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return A set of comparators.
   */
  parseComparator(
    comparator: string,
    options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
  ): string {
    let parsedComparator = comparator;
    parsedComparator = this.replaceHyphens(parsedComparator, options);
    parsedComparator = this.replaceTildes(parsedComparator, options);
    parsedComparator = this.replaceCarets(parsedComparator, options);
    parsedComparator = this.replaceXRanges(parsedComparator, options);
    parsedComparator = this.removeStars(parsedComparator);
    return parsedComparator;
  }

  /**
   * Parses a range string.
   *
   * The parsing follows the following rules:
   * - for each comparator set, if there are any null sets, the whole set is a null set;
   * - the same comparator is not included more than once;
   * - if there are more than one comparator, remove any comparators with an empty-string operator.
   * @param range - The range string to parse.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return An array of comparators.
   */
  parseRange(
    range: string,
    options?: SemverOptionsLoose & SemverOptionsIncludePrerelease
  ): SemverComparatorData[] {
    const rangeList = this.parseComparator(range, options)
      .split(" ")
      .map(comparator => new Comparator(comparator, options));
    const rangeMap = new Map<string, SemverComparatorData>();
    for (const comparator of rangeList) {
      if (this.isNullSet(comparator)) return [comparator];
      rangeMap.set(comparator.value, comparator);
    }
    if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
    return [...rangeMap.values()];
  }

  /**
   * Tests if the version matches the comparator set.
   *
   * If the version provides a pre-release identifier, this finds the set of versions which are allowed to have pre-releases (e.g.: `^1.2.3-pr.1` desugars to `>=1.2.3-pr.1 <2.0.0`, which allows `1.2.3-pr.2` to pass, but not `1.2.4-alpha`, even though it is within the range set by the comparators).
   * @param set - The comparator set to test against.
   * @param version - The version to test.
   * @param [options] - The options to use (`includePrerelease`: whether to include pre-release versions or not, `loose`: whether to use loose mode or not).
   * @return `true` if the version matches the comparator set, `false` otherwise.
   */
  testSet = (
    set: SemverComparatorData[],
    version: SemverData,
    options?: SemverOptionsIncludePrerelease & SemverOptionsLoose
  ) => {
    const { version: versionValue, prerelease } = version;
    const { loose, includePrerelease } = options ?? {};
    for (const comparator of set) {
      if (!new Comparator(comparator.value, { loose }).test(versionValue)) {
        return false;
      }
    }
    if (prerelease.length && !includePrerelease) {
      for (const comparator of set) {
        const { semver: allowed } = comparator;
        const { version: allowedVersion, major, minor, patch, prerelease } = allowed;
        if (allowedVersion === "0.0.0-0") continue;
        if (prerelease.length) {
          if (major === version.major && minor === version.minor && patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };

  /**
   * Tests if the version matches the range.
   * @param version - The version to test.
   * @return `true` if the version matches the range, `false` otherwise.
   */
  test(version: string): boolean {
    if (version) {
      try {
        const semver = new Semver(version, this.options);
        const { includePrerelease } = this.options;
        for (const comparatorSet of this.set) {
          if (this.testSet(comparatorSet, semver, { includePrerelease })) return true;
        }
        return false;
      } catch {
        return false;
      }
    }
    return false;
  }
}
