import { expect, it } from "vitest";

import { increase } from "../src/increase.js";
import { invalidIncrements } from "./fixtures/invalid-increments.js";
import { validIncrements } from "./fixtures/valid-increments.js";
import { validIncrementsInLooseMode } from "./fixtures/valid-increments-in-loose-mode.js";

it.each(
  invalidIncrements
)("should return `null` if the version $version is invalid to be increased", ({
  version,
  releaseType,
  prefix,
  identifierBase
}) => {
  expect(increase(version, releaseType, { prefix, identifierBase })).toBe(null);
});
it.each(
  validIncrementsInLooseMode
)("should throw an error if the version $version is invalid to be increased in strict mode", ({
  version,
  releaseType,
  prefix,
  identifierBase
}) => {
  expect(increase(version, releaseType, { prefix, identifierBase })).toBe(null);
});
it.each(validIncrements)("should return $expected.version when it is $version ($releaseType)", ({
  version,
  releaseType,
  expected,
  prefix,
  identifierBase
}) => {
  expect(increase(version, releaseType, { prefix, identifierBase })).toBe(expected.version);
});
it.each(
  validIncrementsInLooseMode
)("should return $expected.version when it is $version in loose mode ($releaseType)", ({
  version,
  releaseType,
  expected,
  prefix,
  identifierBase
}) => {
  expect(increase(version, releaseType, { prefix, identifierBase }, { loose: true })).toBe(
    expected.version
  );
});
