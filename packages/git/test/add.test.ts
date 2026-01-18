import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { add } from "../src/add.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedFilesArgs = [
  [["package.json"]],
  [["package.json", "package-lock.json"]],
  [["package.json", "pnpm-lock.yaml"]]
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommand: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if no files are provided", async () => {
  const expectedError = new Error("Failed to run the `git add` command: No files to add.", {
    cause: {
      title: "Failed to run the `git add` command",
      message: "No files to add.",
      details: {
        output: "files.length: 0"
      }
    }
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(add([], mockedCwd)).rejects.toThrowError(expectedError);
});
it.each(mockedFilesArgs)("should run the command with %o", async mockedFilesArg => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await add(mockedFilesArg, mockedCwd);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["add", ...mockedFilesArg], { cwd: mockedCwd });
});
