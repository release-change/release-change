import { beforeEach, describe, expect, it, vi } from "vitest";

import { isGitRepository } from "../../src/git/is-git-repository.js";
import { runCommand } from "../../src/shared/run-command.js";

describe("check if this is a Git repository", () => {
  beforeEach(() => {
    vi.mock("../../src/shared/run-command.js");
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
