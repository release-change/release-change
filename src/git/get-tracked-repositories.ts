import { execSync } from "node:child_process";
import { isGitRepository } from "./is-git-repository.js";

/**
 * Gets the tracks repositories.
 * @return The value returned by `git remote -v` if this is a Git repository, `null` otherwise.
 */
export const getTrackedRepositories = async (): Promise<string | null> => {
  if (await isGitRepository()) return execSync("git remote -v", { encoding: "utf8" });
  return null;
};
