import { runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { add } from "../src/add.js";

const mockedFilesArgs = [
  [["package.json"]],
  [["package.json", "package-lock.json"]],
  [["package.json", "pnpm-lock.yaml"]]
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommand: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if no files are provided", async () => {
  await expect(add([])).rejects.toThrowError("No files to add.");
});
it.each(mockedFilesArgs)("should run the command with %o", async mockedFilesArg => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await add(mockedFilesArg);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["add", ...mockedFilesArg]);
});
