import { expect, it } from "vitest";

import { inc } from "../src/inc.js";
import { validIncrements } from "./fixtures/valid-increments.js";
import { validIncrementsInLooseMode } from "./fixtures/valid-increments-in-loose-mode.js";

it.each(
  validIncrementsInLooseMode
)("should return $expected.version when it is $version in loose mode ($releaseType)", ({
  version,
  releaseType,
  expected,
  prefix,
  identifierBase
}) => {
  expect(inc(version, releaseType, { loose: true }, prefix, identifierBase)).toBe(expected.version);
});
it.each(validIncrements)("should return $expected.version when it is $version ($releaseType)", ({
  version,
  releaseType,
  expected,
  prefix,
  identifierBase
}) => {
  expect(inc(version, releaseType, prefix, identifierBase)).toBe(expected.version);
});
