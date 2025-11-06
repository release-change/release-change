import { expect, it } from "vitest";

import { clean } from "../src/index.js";
import { cleanedVersions } from "./fixtures/cleaned-versions.js";

it.each(cleanedVersions)("should clean $0 and return $1", (input, expected) => {
  expect(clean(input)).toBe(expected);
});
