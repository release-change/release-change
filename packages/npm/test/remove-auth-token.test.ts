import fs from "node:fs";

import { formatDetailedError } from "@release-change/shared";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { getYarnrcFile } from "../src/get-yarnrc-file.js";
import { removeAuthToken } from "../src/remove-auth-token.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedNpmrcFileWithToken } from "./fixtures/mocked-npmrc-file-with-token.js";
import { mockedPathToNpmrcFile } from "./fixtures/mocked-path-to-npmrc-file.js";
import { mockedPathToYarnrcFile } from "./fixtures/mocked-path-to-yarnrc-file.js";
import { mockedYarnrcFilesWithToken } from "./fixtures/mocked-yarnrc-files-with-token.js";
import { mockedYarnrcFilesWithoutToken } from "./fixtures/mocked-yarnrc-files-without-token.js";
import { packageManagersNotYarn } from "./fixtures/package-managers.js";

vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
vi.mock("../src/get-yarnrc-file.js", () => ({
  getYarnrcFile: vi.fn()
}));
vi.mock("../src/get-npmrc-file.js", () => ({
  getNpmrcFile: vi.fn()
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("for `yarn`", () => {
  it("should not try to get the `.npmrc` file", () => {
    vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
    removeAuthToken("yarn", mockedCwd, { fileExists: false, authTokenExists: false });
    expect(getNpmrcFile).not.toHaveBeenCalled();
  });
  it("should throw an error if the `.yarnrc.yml` file does not exist", () => {
    const expectedError = new Error(
      "Failed to remove auth token: Could not find the `.yarnrc.yml` file.",
      {
        cause: {
          title: "Failed to remove auth token",
          message: "Could not find the `.yarnrc.yml` file.",
          details: {
            output: `getYarnrcFile(${mockedCwd}): null`
          }
        }
      }
    );
    vi.mocked(getYarnrcFile).mockReturnValue(null);
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    expect(() =>
      removeAuthToken("yarn", mockedCwd, { fileExists: true, authTokenExists: false })
    ).toThrow(expectedError);
  });
  it.each(mockedYarnrcFilesWithToken)(
    "should remove the `.yarnrc.yml` file if it was created for that purpose",
    mockedYarnrcFileWithToken => {
      vi.mocked(getYarnrcFile).mockReturnValue(mockedYarnrcFileWithToken);
      vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
      removeAuthToken("yarn", mockedCwd, { fileExists: false, authTokenExists: false });
      expect(fs.rmSync).toHaveBeenCalledWith(mockedPathToYarnrcFile);
    }
  );
  it.each(mockedYarnrcFilesWithoutToken)(
    "should remove only the line with auth token in the `.yarnrc.yml` file if the file already existed, but did not set any auth token",
    mockedYarnrcFileWithoutToken => {
      vi.mocked(getYarnrcFile).mockReturnValue(
        `${mockedYarnrcFileWithoutToken}\nnpmAuthToken: "\${NPM_TOKEN}"`
      );
      vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
      vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
      removeAuthToken("yarn", mockedCwd, { fileExists: true, authTokenExists: false });
      expect(fs.rmSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        mockedPathToYarnrcFile,
        mockedYarnrcFileWithoutToken
      );
    }
  );
  it.each(mockedYarnrcFilesWithToken)(
    "should not remove anything in the `.yarnrc.yml` file if the file already existed and set an auth token",
    mockedYarnrcFileWithToken => {
      vi.mocked(getYarnrcFile).mockReturnValue(mockedYarnrcFileWithToken);
      vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
      vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
      removeAuthToken("yarn", mockedCwd, { fileExists: true, authTokenExists: true });
      expect(fs.rmSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    }
  );
});
describe.each(packageManagersNotYarn)("for `$0`", packageManager => {
  it("should not try to get the `.yarnrc.yml` file", () => {
    vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
    removeAuthToken(packageManager, mockedCwd, { fileExists: false, authTokenExists: false });
    expect(getYarnrcFile).not.toHaveBeenCalled();
  });
  it("should throw an error if the `.npmrc` file does not exist", () => {
    const expectedError = new Error(
      "Failed to remove auth token: Could not find the `.npmrc` file.",
      {
        cause: {
          title: "Failed to remove auth token",
          message: "Could not find the `.npmrc` file.",
          details: {
            output: `getNpmrcFile(${mockedCwd}): null`
          }
        }
      }
    );
    vi.mocked(getNpmrcFile).mockReturnValue(null);
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    expect(() =>
      removeAuthToken(packageManager, mockedCwd, { fileExists: true, authTokenExists: false })
    ).toThrow(expectedError);
  });
  it("should remove the `.npmrc` file if it was created for that purpose", () => {
    vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFileWithToken);
    vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
    removeAuthToken(packageManager, mockedCwd, { fileExists: false, authTokenExists: false });
    expect(fs.rmSync).toHaveBeenCalledWith(mockedPathToNpmrcFile);
  });
  it("should remove only the line with auth token in the `.npmrc` file if the file already existed, but did not set any auth token", () => {
    vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFileWithToken);
    vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    removeAuthToken(packageManager, mockedCwd, { fileExists: true, authTokenExists: false });
    expect(fs.rmSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockedPathToNpmrcFile,
      "someKey=value\nanotherKey=value"
    );
  });
  it("should not remove anything in the `.npmrc` file if the file already existed and set an auth token", () => {
    vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFileWithToken);
    vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    removeAuthToken(packageManager, mockedCwd, { fileExists: true, authTokenExists: true });
    expect(fs.rmSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
