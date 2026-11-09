import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { getYarnrcFile } from "../src/get-yarnrc-file.js";
import { setAuthToken } from "../src/set-auth-token.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedNpmrcFileWithoutToken } from "./fixtures/mocked-npmrc-file-without-token.js";
import { mockedPathToNpmrcFile } from "./fixtures/mocked-path-to-npmrc-file.js";
import { mockedPathToYarnrcFile } from "./fixtures/mocked-path-to-yarnrc-file.js";
import { mockedYarnrcFilesWithoutToken } from "./fixtures/mocked-yarnrc-files-without-token.js";

const expectedYarnrcFileAuthTokenLine = `npmAuthToken: "\${NPM_TOKEN}"`;
// biome-ignore lint/suspicious/noTemplateCurlyInString: <literal `${}`>
const expectedNpmrcFileAuthTokenLine = "//registry.npmjs.org/:_authToken=${NPM_TOKEN}";

vi.mock("../src/get-yarnrc-file.js", () => ({
  getYarnrcFile: vi.fn()
}));
vi.mock("../src/get-npmrc-file.js", () => ({
  getNpmrcFile: vi.fn()
}));

describe("for `pnpm`", () => {
  it("should not try to get the `.npmrc` file nor the `.yarnrc.yml` file", () => {
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    vi.mocked(getNpmrcFile).mockReturnValue(null);
    vi.mocked(getYarnrcFile).mockReturnValue(null);
    setAuthToken("pnpm", mockedCwd);
    expect(getNpmrcFile).not.toHaveBeenCalled();
    expect(getYarnrcFile).not.toHaveBeenCalled();
  });
});
describe("for `yarn`", () => {
  it("should not try to get the `.npmrc` file", () => {
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    vi.mocked(getYarnrcFile).mockReturnValue(null);
    setAuthToken("yarn", mockedCwd);
    expect(getNpmrcFile).not.toHaveBeenCalled();
  });
  it.each(mockedYarnrcFilesWithoutToken)(
    "should append the `.yarnrc.yml` file if it already exists",
    mockedYarnrcFileWithoutToken => {
      vi.spyOn(fs, "appendFileSync").mockImplementation(() => undefined);
      vi.mocked(getYarnrcFile).mockReturnValue(mockedYarnrcFileWithoutToken);
      setAuthToken("yarn", mockedCwd);
      expect(fs.appendFileSync).toHaveBeenCalledWith(
        mockedPathToYarnrcFile,
        `\n${expectedYarnrcFileAuthTokenLine}`
      );
    }
  );
  it("should create and fill the `.yarnrc.yml` file if it does not exist", () => {
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    vi.mocked(getYarnrcFile).mockReturnValue(null);
    setAuthToken("yarn", mockedCwd);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockedPathToYarnrcFile,
      expectedYarnrcFileAuthTokenLine
    );
  });
});
describe("for `npm`", () => {
  it("should not try to get the `.yarnrc.yml` file", () => {
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    vi.mocked(getNpmrcFile).mockReturnValue(null);
    setAuthToken("npm", mockedCwd);
    expect(getYarnrcFile).not.toHaveBeenCalled();
  });
  it("should append the `.npmrc` file if it already exists", () => {
    vi.spyOn(fs, "appendFileSync").mockImplementation(() => undefined);
    vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFileWithoutToken);
    setAuthToken("npm", mockedCwd);
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      mockedPathToNpmrcFile,
      `\n${expectedNpmrcFileAuthTokenLine}`
    );
  });
  it("should create and fill the `.npmrc` file if it does not exist", () => {
    vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
    vi.mocked(getNpmrcFile).mockReturnValue(null);
    setAuthToken("npm", mockedCwd);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockedPathToNpmrcFile,
      expectedNpmrcFileAuthTokenLine
    );
  });
});
