import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getReleaseToken } from "../src/index.js";

const mockedToken = "release-token";
const mockedEnvWithReleaseToken = {
  RELEASE_TOKEN: mockedToken
};
const mockedEnvWithoutReleaseToken = {};

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the release token is not defined", () => {
  const expectedError = new Error(
    "Failed to get the release token: The release token is not defined.",
    {
      cause: {
        title: "Failed to get the release token",
        message: "The release token is not defined.",
        details: {
          output: "env.RELEASE_TOKEN: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => getReleaseToken(mockedEnvWithoutReleaseToken)).toThrowError(expectedError);
});
it("should return the token if the release token is defined", () => {
  expect(getReleaseToken(mockedEnvWithReleaseToken)).toBe(mockedToken);
});
