import { describe, expectTypeOf, it } from "vitest";

import { runCommand } from "../../src/shared/run-command.js";

describe("run Git command asynchronously", () => {
  const mockedCommand = "git";
  const mockedArgs = ["tag", "-l", "--sort=v:refname", "--merged", "origin/main"];

  it("should return an object with status, stdout and stderr properties and correct types", async () => {
    expectTypeOf(await runCommand(mockedCommand, mockedArgs)).toMatchObjectType<{
      status: number | null;
      stdout: string;
      stderr: string;
    }>();
  });
});
