import type { Context } from "@release-change/shared";

import { afterEach, assert, beforeEach, it, vi } from "vitest";

import { getAuthToken } from "../src/get-auth-token.js";
import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedFileWithToken } from "./fixtures/mocked-file-with-token.js";
import { mockedFileWithoutToken } from "./fixtures/mocked-file-without-token.js";

beforeEach(() => {
  vi.mock("../src/get-npmrc-file.js", () => ({
    getNpmrcFile: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should fill the context with `authToken: { fileExists: false, authTokenExists: false }` if the `.npmrc` file does not exist", () => {
  const expectedContext: Context = {
    ...mockedContext,
    authToken: { fileExists: false, authTokenExists: false }
  };
  vi.mocked(getNpmrcFile).mockReturnValue(null);
  getAuthToken(mockedContext);
  assert.deepEqual(mockedContext, expectedContext);
});
it("should fill the context with `authToken: { fileExists: true, authTokenExists: false }` if the `.npmrc` file exists and does not declare any auth token", () => {
  const expectedContext: Context = {
    ...mockedContext,
    authToken: { fileExists: true, authTokenExists: false }
  };
  vi.mocked(getNpmrcFile).mockReturnValue(mockedFileWithoutToken);
  getAuthToken(mockedContext);
  assert.deepEqual(mockedContext, expectedContext);
});
it("should fill the context with `authToken: { fileExists: true, authTokenExists: true }` if the `.npmrc` file exists and declares an auth token", () => {
  const expectedContext: Context = {
    ...mockedContext,
    authToken: { fileExists: true, authTokenExists: true }
  };
  vi.mocked(getNpmrcFile).mockReturnValue(mockedFileWithToken);
  getAuthToken(mockedContext);
  assert.deepEqual(mockedContext, expectedContext);
});
