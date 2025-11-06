import { expect, it } from "vitest";

import { major } from "../src/index.js";
import { versions } from "./fixtures/major-versions.js";

it.each(versions)("should return $1 for $0", (version, expected, options) => {
  expect(major(version, options)).toBe(expected);
});
