import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getCurrentCommitId } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedCommandResult = {
  status: 0,
  stdout: "0123456789abcdef0123456789abcdef01234567\n",
  stderr: ""
};
const expectedHash = "0123456789abcdef0123456789abcdef01234567";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should run the `git rev-parse HEAD` command and return the hash", () => {
  const mockedCommand = vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
  expect(getCurrentCommitId(mockedCwd)).toBe(expectedHash);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["rev-parse", "HEAD"], { cwd: mockedCwd });
});
