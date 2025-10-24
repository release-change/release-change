import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getAllTags } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should log an error message when an error is caught", () => {
  const expectedError = new Error("Error");
  vi.mocked(runCommandSync).mockImplementation(() => {
    throw expectedError;
  });
  assert.throws(() => getAllTags(mockedContext));
  expect(mockedLogger.logError).toHaveBeenCalled();
  assert.deepNestedInclude(mockedContext.errors, expectedError);
});
it("should return all tags if tags are found", () => {
  const mockedTags = [
    "v2.0.0-alpha.4",
    "@monorepo/a@v2.0.0-alpha.4",
    "@monorepo/b@v2.0.0-alpha.4",
    "v2.0.0-alpha.3",
    "@monorepo/a@v2.0.0-alpha.3",
    "@monorepo/b@v2.0.0-alpha.3",
    "v2.0.0-alpha.2",
    "@monorepo/a@v2.0.0-alpha.2",
    "@monorepo/b@v2.0.0-alpha.2",
    "v2.0.0-alpha.1",
    "@monorepo/a@v2.0.0-alpha.1",
    "@monorepo/b@v2.0.0-alpha.1",
    "v1.1.0",
    "@monorepo/a@v1.1.0",
    "@monorepo/b@v1.1.0",
    "v1.0.1",
    "@monorepo/a@v1.0.1",
    "@monorepo/b@v1.0.1",
    "v1.0.0",
    "@monorepo/a@v1.0.0",
    "@monorepo/b@v1.0.0",
    "v0.2.0",
    "@monorepo/a@v0.2.0",
    "@monorepo/b@v0.2.0",
    "v0.1.0",
    "@monorepo/a@v0.1.0",
    "@monorepo/b@v0.1.0"
  ];
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: mockedTags.join("\n"),
    stderr: ""
  });
  assert.deepEqual(getAllTags(mockedContext), mockedTags);
  expect(runCommandSync).toHaveBeenCalledWith(
    "git",
    [
      "tag",
      "-l",
      "--sort=-creatordate",
      "--merged",
      `${mockedContext.config.remoteName}/${mockedContext.branch}`
    ],
    { cwd: mockedCwd }
  );
});
it("should return an empty array if no tags are found", () => {
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: "",
    stderr: ""
  });
  assert.deepEqual(getAllTags(mockedContext), []);
  expect(runCommandSync).toHaveBeenCalledWith(
    "git",
    [
      "tag",
      "-l",
      "--sort=-creatordate",
      "--merged",
      `${mockedContext.config.remoteName}/${mockedContext.branch}`
    ],
    { cwd: mockedCwd }
  );
});
