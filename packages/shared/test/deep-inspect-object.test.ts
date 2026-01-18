import { expect, it } from "vitest";

import { deepInspectObject } from "../src/index.js";

it("should display a string representation of an object", () => {
  const object = { a: 1, b: { c: { d: 2 } } };
  const expected = "{ a: 1, b: { c: { d: 2 } } }";
  expect(deepInspectObject(object)).toBe(expected);
});
it("should display a string representation of an array", () => {
  const object = ["a", ["b", ["c", "d"]]];
  const expected = "[ 'a', [ 'b', [ 'c', 'd' ] ] ]";
  expect(deepInspectObject(object)).toBe(expected);
});
