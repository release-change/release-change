import { runCommand } from "@release-change/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { isGitRepository } from "../src/is-git-repository.js";

describe("check if this is a Git repository", () => {
  beforeEach(() => {
    vi.mock("@release-change/shared", () => ({ runCommand: vi.fn() }));
  });

  it("should return `false` if it is not a Git repository", async () => {
    vi.mocked(runCommand).mockReturnValue(
      Promise.resolve({
        status: 1,
        stdout: "",
        stderr: "Error"
      })
    );
    expect(await isGitRepository()).toBe(false);
  });
  it("should return `true` if it is a Git repository", async () => {
    vi.mocked(runCommand).mockReturnValue(
      Promise.resolve({
        status: 0,
        stdout: "",
        stderr: ""
      })
    );
    expect(await isGitRepository()).toBe(true);
  });
});
