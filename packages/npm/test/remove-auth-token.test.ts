import fs from "node:fs";

import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { removeAuthToken } from "../src/remove-auth-token.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedFileWithToken } from "./fixtures/mocked-file-with-token.js";
import { mockedPathToNpmrcFile } from "./fixtures/mocked-path-to-npmrc-file.js";

const expectedFileWithoutToken = "someKey=value\nanotherKey=value";

beforeEach(() => {
  vi.mock("../src/get-npmrc-file.js", () => ({
    getNpmrcFile: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the `.npmrc` file does not exist", () => {
  vi.mocked(getNpmrcFile).mockReturnValue(null);
  expect(() =>
    removeAuthToken(mockedCwd, { fileExists: false, authTokenExists: false })
  ).toThrowError();
});
it("should remove the `.npmrc` file if it was created for that purpose", () => {
  vi.mocked(getNpmrcFile).mockReturnValue(mockedFileWithToken);
  vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
  removeAuthToken(mockedCwd, { fileExists: false, authTokenExists: false });
  expect(fs.rmSync).toHaveBeenCalledWith(mockedPathToNpmrcFile);
});
it("should remove only the line with auth token in the `.npmrc` file if the file already existed, but did not set any auth token", () => {
  vi.mocked(getNpmrcFile).mockReturnValue(mockedFileWithToken);
  vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
  vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
  removeAuthToken(mockedCwd, { fileExists: true, authTokenExists: false });
  expect(fs.rmSync).not.toHaveBeenCalled();
  expect(fs.writeFileSync).toHaveBeenCalledWith(mockedPathToNpmrcFile, expectedFileWithoutToken);
});
it("should not remove anything in the `.npmrc` file if the file already existed and set an auth token", () => {
  vi.mocked(getNpmrcFile).mockReturnValue(mockedFileWithToken);
  vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
  vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
  removeAuthToken(mockedCwd, { fileExists: true, authTokenExists: true });
  expect(fs.rmSync).not.toHaveBeenCalled();
  expect(fs.writeFileSync).not.toHaveBeenCalled();
});
