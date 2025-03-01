import type { Logger } from "../logger/logger.types.js";

import { isGitRepository } from "./is-git-repository.js";

/**
 * Checks the repository.
 * @param logger - The logger object to log errors.
 * @return The current exit code if it is a Git repository, the exit code set to `1` with immediate effect otherwise.
 */
export const checkRepository = async (logger: Logger): Promise<string | number | undefined> => {
  if (!(await isGitRepository())) {
    logger.logError("The current directory is not a Git repository");
    process.exit(1);
  }
  return process.exitCode;
};
