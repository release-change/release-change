import type {
  SemverComparatorData,
  SemverComparatorOperator,
  SemverData,
  SemverOptionsLoose
} from "../semver.types.js";

import { compareWithOperator } from "../compare-with-operator.js";
import { validate } from "../validate.js";
import { Semver } from "./semver.js";

import { COMPARATOR_PATTERN, COMPARATOR_PATTERN_LOOSE } from "../constants.js";

/**
 * `Comparator` object.
 */
export class Comparator implements SemverComparatorData {
  operator: SemverComparatorOperator = "";
  semver: SemverData = {
    raw: "0.0.0-0",
    version: "0.0.0-0",
    major: 0,
    minor: 0,
    patch: 0,
    prerelease: [0],
    build: []
  };
  value = "";

  /**
   * Creates a new `Comparator` instance.
   * @param comparator - The comparator string.
   * @param [options] - The options to use (`loose`: whether to use loose mode or not).
   */
  constructor(comparator: string, options?: SemverOptionsLoose) {
    this.parse(comparator.trim(), options);
  }

  /**
   * Parses the comparator string.
   *
   * If the comparator is an empty string, the `Semver` object is treated like version 0.0.0-0. The `=` operator is ignored.
   * @param comparator - The comparator string to parse.
   * @param [options] - The options to use (`loose`: whether to use loose mode or not).
   */
  parse(comparator: string, options?: SemverOptionsLoose): void {
    if (comparator) {
      const { loose } = options ?? {};
      const match = comparator.match(loose ? COMPARATOR_PATTERN_LOOSE : COMPARATOR_PATTERN);
      if (!match || !match.groups) throw new Error(`Invalid comparator \`${comparator}\`.`);
      const { operator, major, minor, patch, prerelease, build } = match.groups;
      if (!major || !minor || !patch) throw new Error(`Invalid comparator \`${comparator}\`.`);
      const version = `${major}.${minor}.${patch}${prerelease ? `-${prerelease}` : ""}${build ? `+${build}` : ""}`;
      this.operator = operator
        ? operator === "="
          ? ""
          : (operator as SemverComparatorOperator)
        : "";
      this.semver = new Semver(version, options);
      this.value = this.operator + this.semver.version;
    }
  }

  /**
   * Tests if the version matches the comparator.
   * @param version - The version to test.
   * @param [options] - The options to use (`loose`: whether to use loose mode or not).
   * @return `true` if the version matches the comparator, `false` otherwise.
   */
  test(version: string, options?: SemverOptionsLoose): boolean {
    if (!this.value) return true;
    if (!validate(version, options)) return false;
    try {
      const semver = new Semver(version, options);
      return compareWithOperator(semver, this.operator, this.semver.version, options);
    } catch {
      return false;
    }
  }
}
