import type { SemverOperator } from "../src/semver.types.js";

import { describe, expect, it, test } from "vitest";

import { Semver } from "../src/classes/semver.js";
import { compareWithOperator } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";
import { equalities } from "./fixtures/equalities.js";
import { equalitiesInLooseMode } from "./fixtures/equalities-in-loose-mode.js";

const equalityOperators: SemverOperator[] = ["", "=", "=="];
const greaterThanOperators: SemverOperator[] = [">", ">="];
const lessThanOperators: SemverOperator[] = ["<", "<="];
const nonStrictOperators: SemverOperator[] = [
  ...equalityOperators,
  "!=",
  ...greaterThanOperators,
  ...lessThanOperators
];
const strictEqualities = [
  { a: "1.2.3", b: "1.2.3" },
  { a: new Semver("1.2.3"), b: new Semver("1.2.3") },
  { a: new Semver("1.2.3"), b: "1.2.3" },
  { a: "1.2.3", b: new Semver("1.2.3") }
];
const strictInequalities = [
  { a: "1.2.3", b: "1.0.0" },
  { a: new Semver("1.2.3"), b: new Semver("1.0.0") },
  { a: new Semver("1.2.3"), b: "1.0.0" },
  { a: "1.2.3", b: new Semver("1.0.0") }
];

describe.each(nonStrictOperators)("try to compare a and b with %s", operator => {
  it.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
    "should throw an error if $a and $b are compared in strict mode",
    ({ a, b }) => {
      expect(() => compareWithOperator(a, operator, b)).toThrow();
    }
  );
});
test.each(strictEqualities)("$a and $b should match the operator ===", ({ a, b }) => {
  expect(compareWithOperator(a, "===", b)).toBe(true);
});
test.each(strictInequalities)("$a and $b should not match the operator ===", ({ a, b }) => {
  expect(compareWithOperator(a, "===", b)).toBe(false);
});
test.each(strictInequalities)("$a and $b should match the operator !==", ({ a, b }) => {
  expect(compareWithOperator(a, "!==", b)).toBe(true);
});
test.each(strictEqualities)("$a and $b should not match the operator !==", ({ a, b }) => {
  expect(compareWithOperator(a, "!==", b)).toBe(false);
});
describe.each(equalityOperators)("compare a and b with %s", operator => {
  test.each(equalities)("$a and $b should match the operator $operator", ({ a, b }) => {
    expect(compareWithOperator(a, operator, b)).toBe(true);
  });
  test.each(comparisons)("$a and $b should not match the operator $operator", ({ a, b }) => {
    expect(compareWithOperator(a, operator, b)).toBe(false);
  });
  test.each(equalitiesInLooseMode)(
    "$a and $b should match the operator $operator in loose mode",
    ({ a, b }) => {
      expect(compareWithOperator(a, operator, b, { loose: true })).toBe(true);
    }
  );
  test.each(comparisonsInLooseMode)(
    "$a and $b should not match the operator $operator in loose mode",
    ({ a, b }) => {
      expect(compareWithOperator(a, operator, b, { loose: true })).toBe(false);
    }
  );
});
test.each(comparisons)("$a and $b should match the operator !=", ({ a, b }) => {
  expect(compareWithOperator(a, "!=", b)).toBe(true);
});
test.each(equalities)("$a and $b should not match the operator !=", ({ a, b }) => {
  expect(compareWithOperator(a, "!=", b)).toBe(false);
});
test.each(comparisonsInLooseMode)(
  "$a and $b should match the operator != in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(a, "!=", b, { loose: true })).toBe(true);
  }
);
test.each(equalitiesInLooseMode)(
  "$a and $b should not match the operator != in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(a, "!=", b, { loose: true })).toBe(false);
  }
);
test.each(comparisons)("$a and $b should match the operator >", ({ a, b }) => {
  expect(compareWithOperator(a, ">", b)).toBe(true);
});
test.each([...comparisons, ...equalities])(
  "$a and $b should not match the operator >",
  ({ a, b }) => {
    expect(compareWithOperator(b, ">", a)).toBe(false);
  }
);
test.each(comparisonsInLooseMode)(
  "$a and $b should match the operator > in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(a, ">", b, { loose: true })).toBe(true);
  }
);
test.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "$a and $b should not match the operator > in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(b, ">", a, { loose: true })).toBe(false);
  }
);
test.each([...comparisons, ...equalities])("$a and $b should match the operator >=", ({ a, b }) => {
  expect(compareWithOperator(a, ">=", b)).toBe(true);
});
test.each(comparisons)("$a and $b should not match the operator >=", ({ a, b }) => {
  expect(compareWithOperator(b, ">=", a)).toBe(false);
});
test.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "$a and $b should match the operator >= in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(a, ">=", b, { loose: true })).toBe(true);
  }
);
test.each(comparisonsInLooseMode)(
  "$a and $b should not match the operator >= in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(b, ">=", a, { loose: true })).toBe(false);
  }
);
test.each(comparisons)("$a and $b should match the operator <", ({ a, b }) => {
  expect(compareWithOperator(b, "<", a)).toBe(true);
});
test.each([...comparisons, ...equalities])(
  "$a and $b should not match the operator <",
  ({ a, b }) => {
    expect(compareWithOperator(a, "<", b)).toBe(false);
  }
);
test.each(comparisonsInLooseMode)(
  "$a and $b should match the operator < in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(b, "<", a, { loose: true })).toBe(true);
  }
);
test.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "$a and $b should not match the operator < in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(a, "<", b, { loose: true })).toBe(false);
  }
);
test.each([...comparisons, ...equalities])("$a and $b should match the operator <=", ({ a, b }) => {
  expect(compareWithOperator(b, "<=", a)).toBe(true);
});
test.each(comparisons)("$a and $b should not match the operator <=", ({ a, b }) => {
  expect(compareWithOperator(a, "<=", b)).toBe(false);
});
test.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "$a and $b should match the operator <= in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(b, "<=", a, { loose: true })).toBe(true);
  }
);
test.each(comparisonsInLooseMode)(
  "$a and $b should not match the operator <= in loose mode",
  ({ a, b }) => {
    expect(compareWithOperator(a, "<=", b, { loose: true })).toBe(false);
  }
);
