import { expect, it } from "vitest";

import { getDifference } from "../src/index.js";
import { differences } from "./fixtures/differences.js";
import { differencesInLooseMode } from "./fixtures/differences-in-loose-mode.js";

it("should throw an error if there is an invalid version", () => {
  expect(() => getDifference("bad", "1.2.3")).toThrow();
});
it.each(differencesInLooseMode)(
  "should throw an error if $0 and $1 are compared in strict mode",
  (a, b) => {
    expect(() => getDifference(a, b)).toThrow();
  }
);
it.each(differences)("should return $2 when $0 and $1 are compared", (a, b, expected) => {
  expect(getDifference(a, b)).toBe(expected);
});
it.each(differencesInLooseMode)(
  "should return $2 when $0 and $1 are compared in loose mode",
  (a, b, expected) => {
    expect(getDifference(a, b, { loose: true })).toBe(expected);
  }
);
