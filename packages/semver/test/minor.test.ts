import { expect, it } from "vitest";

import { minor } from "../src/index.js";
import { versions } from "./fixtures/minor-versions.js";

it.each(versions)("should return $1 for $0", (version, expected, options) => {
  expect(minor(version, options)).toBe(expected);
});
