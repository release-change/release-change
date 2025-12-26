import { expect, it } from "vitest";

import { intersects } from "../src/index.js";
import { comparatorIntersections } from "./fixtures/comparator-intersections.js";
import { comparatorIntersectionsInLooseMode } from "./fixtures/comparator-intersections-in-loose-mode.js";
import { rangeIntersections } from "./fixtures/range-intersections.js";

it.each(comparatorIntersections)(
  "should return `$2` when $0 intersects $1",
  (range1, range2, expected, options) => {
    expect(intersects(range1, range2, options)).toBe(expected);
  }
);
it.each(comparatorIntersections)(
  "should return `$2` when $1 intersects $0",
  (range1, range2, expected, options) => {
    expect(intersects(range2, range1, options)).toBe(expected);
  }
);
it.each(comparatorIntersectionsInLooseMode)(
  "should return `$2` when $0 intersects $1 in loose mode",
  (range1, range2, expected, options) => {
    expect(intersects(range1, range2, { ...options, loose: true })).toBe(expected);
  }
);
it.each(comparatorIntersectionsInLooseMode)(
  "should return `$2` when $1 intersects $0 in loose mode",
  (range1, range2, expected, options) => {
    expect(intersects(range2, range1, { ...options, loose: true })).toBe(expected);
  }
);
it.each(rangeIntersections)(
  "should return `$2` when $0 intersects $1",
  (range1, range2, expected) => {
    expect(intersects(range1, range2)).toBe(expected);
  }
);
it.each(rangeIntersections)(
  "should return `$2` when $1 intersects $0",
  (range1, range2, expected) => {
    expect(intersects(range2, range1)).toBe(expected);
  }
);
it.each(rangeIntersections)(
  "should return `$2` when $0 intersects $1 in loose mode",
  (range1, range2, expected) => {
    expect(intersects(range1, range2, { loose: true })).toBe(expected);
  }
);
it.each(rangeIntersections)(
  "should return `$2` when $1 intersects $0 in loose mode",
  (range1, range2, expected) => {
    expect(intersects(range2, range1, { loose: true })).toBe(expected);
  }
);
