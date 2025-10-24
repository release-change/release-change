import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";

import { isGitRepository } from "./is-git-repository.js";

/**
 * Gets the tracked repositories.
 * @param context - The context where the CLI is running.
 * @return The value returned by `git remote -v` if this is a Git repository, `null` otherwise.
 */
export const getTrackedRepositories = async (context: Context): Promise<string | null> => {
  return (await isGitRepository(context, setLogger()))
    ? runCommandSync("git", ["remote", "-v"], { cwd: context.cwd }).stdout
    : null;
};
