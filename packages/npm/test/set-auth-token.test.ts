import fs from "node:fs";

import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { setAuthToken } from "../src/set-auth-token.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedFileWithoutToken } from "./fixtures/mocked-file-without-token.js";
import { mockedPathToNpmrcFile } from "./fixtures/mocked-path-to-npmrc-file.js";

// biome-ignore lint/suspicious/noTemplateCurlyInString: <literal `${}`>
const expectedAuthTokenLine = "//registry.npmjs.org/:_authToken=${NPM_TOKEN}";

beforeEach(() => {
  vi.mock("../src/get-npmrc-file.js", () => ({
    getNpmrcFile: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should append the `.npmrc` file if it already exists", () => {
  vi.spyOn(fs, "appendFileSync").mockImplementation(() => undefined);
  vi.mocked(getNpmrcFile).mockReturnValue(mockedFileWithoutToken);
  setAuthToken(mockedCwd);
  expect(fs.appendFileSync).toHaveBeenCalledWith(
    mockedPathToNpmrcFile,
    `\n${expectedAuthTokenLine}`
  );
});
it("should create and fill the `.npmrc` file if it does not exist", () => {
  vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
  vi.mocked(getNpmrcFile).mockReturnValue(null);
  setAuthToken(mockedCwd);
  expect(fs.writeFileSync).toHaveBeenCalledWith(mockedPathToNpmrcFile, expectedAuthTokenLine);
});
