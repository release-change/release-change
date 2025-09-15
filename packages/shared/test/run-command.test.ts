import { expect, expectTypeOf, it } from "vitest";

import { runCommand } from "../src/index.js";

const mockedArgs = ["tag", "-l", "--sort=v:refname", "--merged", "origin/main"];
const nonExistentCommand = "non-existant-command-12345";
const args = ["some", "args"];

it("should throw an error when the command fails with an error", async () => {
  await expect(runCommand(nonExistentCommand, args)).rejects.toThrow();
});
it("should throw an error containing the command and args in the cause", async () => {
  try {
    await runCommand(nonExistentCommand, args);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    if (error instanceof Error) expect(error.cause).toBe(`${nonExistentCommand} ${args.join(" ")}`);
  }
});
it("should return an object with status, stdout and stderr properties and correct types", async () => {
  expectTypeOf(await runCommand("git", mockedArgs)).toMatchObjectType<{
    status: number | null;
    stdout: string;
    stderr: string;
  }>();
});
