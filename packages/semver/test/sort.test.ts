import { assert, expect, it } from "vitest";

import { sort } from "../src/sort.js";
import { listsToSort } from "./fixtures/lists-to-sort.js";
import { listsToSortInLooseMode } from "./fixtures/lists-to-sort-in-loose-mode.js";

it.each(listsToSortInLooseMode)("should throw an error in strict mode", ({ list }) => {
  expect(() => sort(list)).toThrow();
});
it.each(listsToSort)("should sort in ascending order", ({ list, expectedAscending }) => {
  assert.deepEqual(sort(list), expectedAscending);
});
it.each(listsToSortInLooseMode)(
  "should sort in ascending order in loose mode",
  ({ list, expectedAscending }) => {
    assert.deepEqual(sort(list, { loose: true }), expectedAscending);
  }
);
