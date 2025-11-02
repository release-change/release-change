import { expect, it } from "vitest";

import { getPatch } from "../src/get-patch.js";
import { versions } from "./fixtures/patch-versions.js";

it.each(versions)("should return $1 for $0", (version, expected, options) => {
  expect(getPatch(version, options)).toBe(expected);
});
