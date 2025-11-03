import { expect, it } from "vitest";

import { getMajor } from "../src/index.js";
import { versions } from "./fixtures/major-versions.js";

it.each(versions)("should return $1 for $0", (version, expected, options) => {
  expect(getMajor(version, options)).toBe(expected);
});
