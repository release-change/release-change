/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the command is run> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the command is run> */
import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";

/**
 * Removes a Git tag.
 * @param gitTag - The Git tag to remove.
 * @param cwd - The current working directory.
 * @param [debug] - Whether the CLI is running in debug mode or not.
 */
export const removeTag = (gitTag: string, cwd: string, debug = false): void => {
  const logger = setLogger(debug);
  logger.setScope("git");
  if (gitTag) {
    const args = ["tag", "-d", gitTag];
    // TODO: uncomment to run the Git command
    // const { status, stdout, stderr } = runCommandSync("git", args, { cwd });
    if (debug) {
      logger.setDebugScope("git:remove-tag");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
    }
    // TODO: uncomment when the Git command is run
    // if (status) {
    //   logger.logError(`Failed to remove Git tag ${gitTag}.`);
    //   throw formatDetailedError({
    //     title: "Failed to run the `git` command",
    //     message: `The command failed with status ${status}.`,
    //     details: {
    //       output: stderr || stdout || `Command failed with status ${status}.`,
    //       command: `git ${args.join(" ")}`
    //     }
    //   });
    // }
    logger.logInfo(`Removed Git tag ${gitTag}.`);
  } else {
    throw formatDetailedError({
      title: "Failed to remove a Git tag",
      message: "The Git tag must not be empty.",
      details: { output: "gitTag: " }
    });
  }
};
