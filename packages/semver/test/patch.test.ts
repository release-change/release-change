import { expect, it } from "vitest";

import { patch } from "../src/patch.js";
import { versions } from "./fixtures/patch-versions.js";

it.each(versions)("should return $1 for $0", (version, expected, options) => {
  expect(patch(version, options)).toBe(expected);
});
