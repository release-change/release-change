import { assert, expect, it } from "vitest";

import { getReleaseToken } from "../src/index.js";

const mockedToken = "release-token";
const mockedEnvWithReleaseToken = {
  RELEASE_TOKEN: mockedToken
};
const mockedEnvWithoutReleaseToken = {};

it("should throw an error if the release token is not defined", () => {
  assert.throws(
    () => getReleaseToken(mockedEnvWithoutReleaseToken),
    "The release token is not defined."
  );
});
it("should return the token if the release token is defined", () => {
  expect(getReleaseToken(mockedEnvWithReleaseToken)).toBe(mockedToken);
});
