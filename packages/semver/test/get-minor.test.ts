import { expect, it } from "vitest";

import { getMinor } from "../src/get-minor.js";
import { versions } from "./fixtures/minor-versions.js";

it.each(versions)("should return $1 for $0", (version, expected, options) => {
  expect(getMinor(version, options)).toBe(expected);
});
