import { describe, expectTypeOf, it } from "vitest";

import { runCommand } from "../../src/git/run-command.js";

describe("run git command asynchronously", () => {
  const mockedArgs = ["tag", "-l", "--sort=v:refname", "--merged", "origin/main"];

  it("should return an object with status, stdout and stderr properties and correct types", async () => {
    expectTypeOf(await runCommand(mockedArgs)).toMatchTypeOf<{
      status: number | null;
      stdout: string;
      stderr: string;
    }>();
  });
});
