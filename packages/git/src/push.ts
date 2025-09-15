/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the command is run> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the command is run> */
import type { Context } from "@release-change/shared";
import type { PushOptions } from "./git.types.js";

import { runCommand } from "@release-change/shared";

/**
 * Pushes the current branch to the remote repository.
 * @param context - The context where the CLI is running.
 * @param [pushOptions] - The `push` options to use (whether to include tags or not) when pushing.
 */
export const push = async (context: Context, pushOptions: PushOptions = {}): Promise<void> => {
  const { branch, config } = context;
  const { remoteName } = config;
  if (!branch) {
    process.exitCode = 1;
    throw new Error("A branch name must be provided.");
  }
  const { includeTags } = pushOptions;
  const args = ["push", includeTags && "--follow-tags", remoteName, branch].filter(
    arg => typeof arg === "string"
  );
  // TODO: uncomment to run the command
  // await runCommand("git", args);
};
