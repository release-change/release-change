import { runCommandSync } from "@release-change/shared";

import { isGitRepository } from "./is-git-repository.js";

/**
 * Gets the tracked repositories.
 * @param cwd - The current working directory.
 * @return The value returned by `git remote -v` if this is a Git repository, `null` otherwise.
 */
export const getTrackedRepositories = async (cwd: string): Promise<string | null> => {
  if (await isGitRepository(cwd)) return runCommandSync("git", ["remote", "-v"], { cwd }).stdout;
  return null;
};
