import type { Context } from "../cli/cli.types.js";

import { execSync } from "node:child_process";

import isGitRepository from "./is-git-repository.js";

/**
 * Checks the repository
 * @param context - The context where the CLI is running.
 */
const checkRepository = async (context: Required<Context>): Promise<void> => {
  const { config, logger } = context;
  if (!(await isGitRepository())) {
    logger.logError("The current directory is not a Git repository");
    process.exitCode = 1;
  } else {
    const branch = execSync("git branch --show-current", { encoding: "utf8" });
    const runAutomatedReleaseText = `Run automated release from branch ${branch} on repository ${config.repositoryUrl}`;
    if (config.dryRun) logger.logWarn(`${runAutomatedReleaseText} in dry run mode`);
    else logger.logSuccess(runAutomatedReleaseText);
  }
};

export default checkRepository;
