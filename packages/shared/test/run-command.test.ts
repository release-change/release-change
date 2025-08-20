import { expectTypeOf, it } from "vitest";

import { runCommand } from "../src/index.js";

const mockedArgs = ["tag", "-l", "--sort=v:refname", "--merged", "origin/main"];

it("should return an object with status, stdout and stderr properties and correct types", async () => {
  expectTypeOf(await runCommand("git", mockedArgs)).toMatchObjectType<{
    status: number | null;
    stdout: string;
    stderr: string;
  }>();
});
