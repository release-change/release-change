import type { SemverComparatorData } from "../../src/semver.types.js";

import { expect, it } from "vitest";

import { Comparator } from "../../src/classes/comparator.js";
import { isSimpleRangeSubset } from "../../src/utils/is-simple-range-subset.js";

const createComparator = (value: string): SemverComparatorData => {
  const comparator = new Comparator(value);
  return {
    operator: comparator.operator,
    semver: comparator.semver,
    value: comparator.value
  };
};
const createSet = (...values: string[]): SemverComparatorData[] => {
  return values.map(value => createComparator(value));
};

it("should return `true` when exact versions are equal", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("1.2.3"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("=1.2.3"), createSet("=1.2.3"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("=1.2.3"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("=1.2.3"), createSet("1.2.3"))).toBe(true);
});
it("should return `false` when exact versions differ", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("1.2.4"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("=1.2.3"), createSet("=1.2.4"))).toBe(false);
});
it("should return `true` when exact version satisfies super range", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet(">1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("<=2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("<2.0.0"))).toBe(true);
});
it("should return `false` when exact version does not satisfy super range", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet(">=2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet(">2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("<=1.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("<1.0.0"))).toBe(false);
});
it("should return `true` when >= subrange is more restrictive than >= super range", () => {
  expect(isSimpleRangeSubset(createSet(">=2.0.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">=1.5.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), createSet(">=1.0.0"))).toBe(true);
});
it("should return `false` when >= subrange is less restrictive than >= super range", () => {
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), createSet(">=2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), createSet(">=1.5.0"))).toBe(false);
});
it("should return `true` when > subrange with >= super range is valid", () => {
  expect(isSimpleRangeSubset(createSet(">2.0.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">1.5.0"), createSet(">=1.0.0"))).toBe(true);
});
it("should return `false` when > subrange with >= super range is invalid", () => {
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet(">=2.0.0"))).toBe(false);
});
it("should return `true` when > subrange is more restrictive than > super range", () => {
  expect(isSimpleRangeSubset(createSet(">2.0.0"), createSet(">1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">1.5.0"), createSet(">1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet(">1.0.0"))).toBe(true);
});
it("should return `false` when > subrange is less restrictive than > super range", () => {
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet(">2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet(">1.5.0"))).toBe(false);
});
it("should return `true` when <= subrange is more restrictive than <= super range", () => {
  expect(isSimpleRangeSubset(createSet("<=1.0.0"), createSet("<=2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("<=1.5.0"), createSet("<=2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("<=2.0.0"), createSet("<=2.0.0"))).toBe(true);
});
it("should return `false` when <= subrange is less restrictive than <= super range", () => {
  expect(isSimpleRangeSubset(createSet("<=2.0.0"), createSet("<=1.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("<=2.0.0"), createSet("<=1.5.0"))).toBe(false);
});
it("should return `true` when < subrange with <= super range is valid", () => {
  expect(isSimpleRangeSubset(createSet("<1.0.0"), createSet("<=2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet("<=2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("<1.5.0"), createSet("<=2.0.0"))).toBe(true);
});
it("should return `false` when < subrange with <= super range is invalid", () => {
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet("<=1.0.0"))).toBe(false);
});
it("should return `true` when < subrange is more restrictive than < super range", () => {
  expect(isSimpleRangeSubset(createSet("<1.0.0"), createSet("<2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("<1.5.0"), createSet("<2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet("<2.0.0"))).toBe(true);
});
it("should return `false` when < subrange is less restrictive than < super range", () => {
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet("<1.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet("<1.5.0"))).toBe(false);
});
it("should return `false` when lower bound operator is incompatible with upper bound operator", () => {
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), createSet("<2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), createSet("<=2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), createSet(">2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet("<2.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">1.0.0"), createSet("<=2.0.0"))).toBe(false);
});
it("should return `false` when upper bound operator is incompatible with lower bound operator", () => {
  expect(isSimpleRangeSubset(createSet("<=2.0.0"), createSet(">=1.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("<=2.0.0"), createSet(">1.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet(">=1.0.0"))).toBe(false);
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet(">1.0.0"))).toBe(false);
});
it("should return `false` when subrange has pre-release but super range does not when not in pre-release mode", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3-beta.1"), createSet("1.2.3"))).toBe(false);
  expect(isSimpleRangeSubset(createSet(">=1.2.3-beta.1"), createSet(">=1.2.3"))).toBe(false);
});
it("should return `true` when both have pre-release when not in pre-release mode", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3-beta.1"), createSet("1.2.3-beta.1"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">=1.2.3-beta.1"), createSet(">=1.2.3-alpha.1"))).toBe(true);
});
it("should return `true` when neither has pre-release when not in pre-release mode", () => {
  expect(isSimpleRangeSubset(createSet("1.2.3"), createSet("1.2.3"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">=1.2.3"), createSet(">=1.2.2"))).toBe(true);
});
it("should allow subrange with pre-release when in pre-release mode", () => {
  expect(
    isSimpleRangeSubset(createSet("1.2.3-beta.1"), createSet("1.2.3"), { includePrerelease: true })
  ).toBe(false);
  expect(
    isSimpleRangeSubset(createSet(">=1.2.3-beta.1"), createSet(">=1.2.3-alpha.1"), {
      includePrerelease: true
    })
  ).toBe(true);
});
it("should return `true` when subrange with both bounds is more restrictive", () => {
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<2.0.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<2.0.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<2.5.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(
    true
  );
});
it("should return `false` when subrange lower bound is less restrictive", () => {
  expect(isSimpleRangeSubset(createSet(">=0.5.0", "<2.0.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(
    false
  );
});
it("should return `false` when subrange upper bound is less restrictive", () => {
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<3.5.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(
    false
  );
});
it("should return `false` when subrange has no lower bound but super range has one", () => {
  expect(isSimpleRangeSubset(createSet("<2.0.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(false);
});
it("should return `false` when subrange has no upper bound but super range has one", () => {
  expect(isSimpleRangeSubset(createSet(">=1.5.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(false);
});
it("should return `true` when subrange has both bounds but super range has neither", () => {
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<2.0.0"), createSet(">0.0.0"))).toBe(true);
});
it("should detect impossible range when exact version conflicts with bounds", () => {
  expect(isSimpleRangeSubset(createSet("1.5.0", "<1.5.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.5.0", ">1.5.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.5.0", "<=1.0.0"), createSet(">=1.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.5.0", ">=2.0.0"), createSet(">=1.0.0"))).toBe(true);
});
it("should treat >=X <=X as equivalent to =X", () => {
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<=1.5.0"), createSet("1.5.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<=1.5.0"), createSet("=1.5.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<=1.5.0"), createSet("1.0.0"))).toBe(false);
});
it("should check if >=X <=X satisfies multi-comparator super range", () => {
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<=1.5.0"), createSet(">=1.0.0", "<2.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<=1.5.0"), createSet(">=2.0.0", "<3.0.0"))).toBe(
    false
  );
});
it("should handle > subrange with >= super range correctly", () => {
  expect(isSimpleRangeSubset(createSet(">1.5.0", "<2.5.0"), createSet(">=1.0.0", "<3.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">1.5.0", "<2.5.0"), createSet(">1.0.0", "<3.0.0"))).toBe(
    true
  );
});
it("should handle >= subrange with > super range correctly", () => {
  expect(isSimpleRangeSubset(createSet(">=1.5.0", "<2.5.0"), createSet(">1.0.0", "<3.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<2.5.0"), createSet(">1.0.0", "<3.0.0"))).toBe(
    false
  );
});
it("should handle < subrange with <= super range correctly", () => {
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<2.5.0"), createSet(">=0.5.0", "<=3.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<2.5.0"), createSet(">=0.5.0", "<3.0.0"))).toBe(
    true
  );
});
it("should handle <= subrange with < super range correctly", () => {
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<=2.5.0"), createSet(">=0.5.0", "<3.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "<=3.0.0"), createSet(">=0.5.0", "<3.0.0"))).toBe(
    false
  );
});
it("should handle exact version as bound in multi-comparator context", () => {
  expect(isSimpleRangeSubset(createSet("1.5.0", "<3.0.0"), createSet(">=1.0.0", "<4.0.0"))).toBe(
    true
  );
  expect(isSimpleRangeSubset(createSet(">=1.0.0", "2.5.0"), createSet(">=0.5.0", "<=3.0.0"))).toBe(
    true
  );
});
it("should check if exact version satisfies super bounds", () => {
  expect(isSimpleRangeSubset(createSet("1.5.0"), createSet(">=1.0.0", "<2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("1.5.0"), createSet(">1.0.0", "<=2.0.0"))).toBe(true);
  expect(isSimpleRangeSubset(createSet("2.5.0"), createSet(">=1.0.0", "<2.0.0"))).toBe(false);
});
it("should return `false` when subrange comparators are undefined", () => {
  expect(isSimpleRangeSubset([], createSet(">=1.0.0"))).toBe(false);
});
it("should return `true` when super range comparators are undefined", () => {
  expect(isSimpleRangeSubset(createSet(">=1.0.0"), [])).toBe(true);
});
it("should return `true` when both comparators are undefined", () => {
  expect(isSimpleRangeSubset([], [])).toBe(true);
});
it("should check pre-release compatibility in multi-comparator ranges", () => {
  expect(
    isSimpleRangeSubset(createSet(">=1.2.3-beta.1", "<2.0.0"), createSet(">=1.2.3", "<3.0.0"))
  ).toBe(false);
  expect(
    isSimpleRangeSubset(
      createSet(">=1.2.3-beta.1", "<2.0.0"),
      createSet(">=1.2.3-alpha.1", "<3.0.0")
    )
  ).toBe(true);
  expect(
    isSimpleRangeSubset(createSet(">=1.2.3", "<2.0.0"), createSet(">=1.2.3-alpha.1", "<3.0.0"))
  ).toBe(false);
});
