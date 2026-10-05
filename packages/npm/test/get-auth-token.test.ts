import type { Context } from "@release-change/shared";

import { assert, describe, expect, it, vi } from "vitest";

import { getAuthToken } from "../src/get-auth-token.js";
import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { getYarnrcFile } from "../src/get-yarnrc-file.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedNpmrcFileWithToken } from "./fixtures/mocked-npmrc-file-with-token.js";
import { mockedNpmrcFileWithoutToken } from "./fixtures/mocked-npmrc-file-without-token.js";
import { mockedYarnrcFilesWithToken } from "./fixtures/mocked-yarnrc-files-with-token.js";
import { mockedYarnrcFilesWithoutToken } from "./fixtures/mocked-yarnrc-files-without-token.js";
import { packageManagers, packageManagersNotYarn } from "./fixtures/package-managers.js";

vi.mock("../src/get-yarnrc-file.js", () => ({
  getYarnrcFile: vi.fn()
}));
vi.mock("../src/get-npmrc-file.js", () => ({
  getNpmrcFile: vi.fn()
}));

it.each(packageManagers)(
  "should fill the context with `authToken: { fileExists: false, authTokenExists: false }` if both the `.yarnrc.yml` and `.npmrc` files do not exist",
  packageManager => {
    const expectedContext: Context = {
      ...mockedContext,
      authToken: { fileExists: false, authTokenExists: false }
    };
    vi.mocked(getYarnrcFile).mockReturnValue(null);
    vi.mocked(getNpmrcFile).mockReturnValue(null);
    getAuthToken(packageManager, mockedContext);
    assert.deepEqual(mockedContext, expectedContext);
  }
);
it.each(packageManagersNotYarn)(
  "should not try to get the `.yarnrc.yml` file if the package manager is `$0`",
  packageManager => {
    getAuthToken(packageManager, mockedContext);
    expect(getYarnrcFile).not.toHaveBeenCalled();
  }
);
it("should not try to get the `.npmrc` file if the package manager is `yarn`", () => {
  getAuthToken("yarn", mockedContext);
  expect(getNpmrcFile).not.toHaveBeenCalled();
});
describe("for `yarn`", () => {
  it("should fill the context with `authToken: { fileExists: false, authTokenExists: false }` if the `.yarnrc.yml` file does not exist", () => {
    const expectedContext: Context = {
      ...mockedContext,
      authToken: { fileExists: false, authTokenExists: false }
    };
    vi.mocked(getYarnrcFile).mockReturnValue(null);
    getAuthToken("yarn", mockedContext);
    assert.deepEqual(mockedContext, expectedContext);
  });
  it.each(mockedYarnrcFilesWithoutToken)(
    "should fill the context with `authToken: { fileExists: true, authTokenExists: false }` if the `.yarnrc.yml` file exists and does not declare any auth token",
    mockedYarnrcFileWithoutToken => {
      const expectedContext: Context = {
        ...mockedContext,
        authToken: { fileExists: true, authTokenExists: false }
      };
      vi.mocked(getYarnrcFile).mockReturnValue(mockedYarnrcFileWithoutToken);
      getAuthToken("yarn", mockedContext);
      assert.deepEqual(mockedContext, expectedContext);
    }
  );
  it.each(mockedYarnrcFilesWithToken)(
    "should fill the context with `authToken: { fileExists: true, authTokenExists: true }` if the `.yarnrc.yml` file exists and declares an auth token",
    mockedYarnrcFileWithToken => {
      const expectedContext: Context = {
        ...mockedContext,
        authToken: { fileExists: true, authTokenExists: true }
      };
      vi.mocked(getYarnrcFile).mockReturnValue(mockedYarnrcFileWithToken);
      getAuthToken("yarn", mockedContext);
      assert.deepEqual(mockedContext, expectedContext);
    }
  );
});
describe.each(packageManagersNotYarn)("for `$0`", packageManager => {
  it("should fill the context with `authToken: { fileExists: false, authTokenExists: false }` if the `.npmrc` file does not exist", () => {
    const expectedContext: Context = {
      ...mockedContext,
      authToken: { fileExists: false, authTokenExists: false }
    };
    vi.mocked(getNpmrcFile).mockReturnValue(null);
    getAuthToken(packageManager, mockedContext);
    assert.deepEqual(mockedContext, expectedContext);
  });
  it("should fill the context with `authToken: { fileExists: true, authTokenExists: false }` if the `.npmrc` file exists and does not declare any auth token", () => {
    const expectedContext: Context = {
      ...mockedContext,
      authToken: { fileExists: true, authTokenExists: false }
    };
    vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFileWithoutToken);
    getAuthToken(packageManager, mockedContext);
    assert.deepEqual(mockedContext, expectedContext);
  });
  it("should fill the context with `authToken: { fileExists: true, authTokenExists: true }` if the `.npmrc` file exists and declares an auth token", () => {
    const expectedContext: Context = {
      ...mockedContext,
      authToken: { fileExists: true, authTokenExists: true }
    };
    vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFileWithToken);
    getAuthToken(packageManager, mockedContext);
    assert.deepEqual(mockedContext, expectedContext);
  });
});
