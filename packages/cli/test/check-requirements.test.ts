import process from "node:process";

import { setLogger } from "@release-change/logger";
import { coerce } from "@release-change/semver";
import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { checkRequirements } from "../src/index.js";
import { isGitVersionCompatible } from "../src/is-git-version-compatible.js";
import { isNodeVersionCompatible } from "../src/is-node-version-compatible.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

import { GIT_MIN_VERSION, REQUIRED_NODE_VERSIONS } from "../src/constants.js";

const formerLtsReleases = [
  "4.9.1",
  "6.17.1",
  "8.17.0",
  "10.24.1",
  "12.22.12",
  "14.21.3",
  "16.20.2"
];

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn(),
    checkErrorType: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn(() => ({
      status: 0,
      stdout: "git version 2.48.1",
      stderr: ""
    })),
    ROOT_PACKAGE_MANIFEST: {
      engines: {
        node: "^20.18.3 || ^22.12.0 || ^24.0.0",
        npm: ">=10.8.2",
        pnpm: ">=10.28.1"
      }
    },
    WORKSPACE_NAME: "release-change",
    WORKSPACE_VERSION: "0.0.0"
  }));
  vi.mock("@release-change/semver", () => ({ coerce: vi.fn() }));
  vi.mock("../src/is-git-version-compatible.js", () => ({
    isGitVersionCompatible: vi.fn()
  }));
  vi.mock("../src/is-node-version-compatible.js", () => ({
    isNodeVersionCompatible: vi.fn()
  }));
  vi.mock("../src/cli.js", () => ({
    cli: vi.fn(() => Promise.resolve(0))
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.spyOn(process, "version", "get").mockReturnValue("v20.18.3");
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(
  formerLtsReleases
)("should call `process.exit(1)` and display an error message if Node version %s is not compatible with those required", async mockedNodeVersion => {
  const formattedRequiredNodeVersions = new Intl.ListFormat("en-GB", {
    style: "long",
    type: "disjunction"
  }).format(REQUIRED_NODE_VERSIONS.replaceAll(/\^([.0-9]+)/gi, "$1+").split(" || "));
  vi.spyOn(process, "version", "get").mockReturnValue(mockedNodeVersion);
  vi.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("process.exit called with 1");
  });
  vi.mocked(isNodeVersionCompatible).mockReturnValue(false);
  await expect(checkRequirements()).rejects.toThrowError("process.exit called with 1");
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${mockedNodeVersion}.`
  );
});
it(`should call \`process.exit(1)\` and display an error message if Git version is less than ${GIT_MIN_VERSION}`, async () => {
  const mockedGitVersion = "git version 2.30.0";
  const mockedVersion = "2.30.0";
  vi.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("process.exit called with 1");
  });
  vi.mocked(coerce).mockReturnValue({
    raw: mockedGitVersion,
    version: mockedVersion,
    major: 2,
    minor: 30,
    patch: 0,
    prerelease: [],
    build: []
  });
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: mockedGitVersion,
    stderr: ""
  });
  vi.mocked(isNodeVersionCompatible).mockReturnValue(true);
  vi.mocked(isGitVersionCompatible).mockReturnValue(false);
  await expect(checkRequirements()).rejects.toThrowError("process.exit called with 1");
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Git version ${GIT_MIN_VERSION} required. Found ${mockedVersion}.`
  );
});
it("should complete successfully when requirements are met", async () => {
  vi.mocked(isNodeVersionCompatible).mockReturnValue(true);
  vi.mocked(isGitVersionCompatible).mockReturnValue(true);
  await expect(checkRequirements()).resolves.not.toThrow();
});
