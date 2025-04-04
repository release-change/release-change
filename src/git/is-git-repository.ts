import { checkErrorType } from "../logger/check-error-type.js";
import { setLogger } from "../logger/set-logger.js";
import { runCommand } from "./run-command.js";

/**
 * Checks whether it is a Git repository or not.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
export const isGitRepository = async (): Promise<boolean> => {
  try {
    const gitCommandResult = await runCommand(["rev-parse", "--git-dir"]);
    return !gitCommandResult.status;
  } catch (error) {
    setLogger().logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
