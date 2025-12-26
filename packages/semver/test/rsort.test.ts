import { assert, expect, it } from "vitest";

import { rsort } from "../src/index.js";
import { listsToSort } from "./fixtures/lists-to-sort.js";
import { listsToSortInLooseMode } from "./fixtures/lists-to-sort-in-loose-mode.js";

it.each(listsToSortInLooseMode)("should throw an error in strict mode", ({ list }) => {
  expect(() => rsort(list)).toThrow();
});
it.each(listsToSort)("should sort in ascending order", ({ list, expectedDescending }) => {
  assert.deepEqual(rsort(list), expectedDescending);
});
it.each(listsToSortInLooseMode)("should sort in ascending order in loose mode", ({
  list,
  expectedDescending
}) => {
  assert.deepEqual(rsort(list, { loose: true }), expectedDescending);
});
