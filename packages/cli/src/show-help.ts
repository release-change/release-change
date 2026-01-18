import { setLogger } from "@release-change/logger";
import { WORKSPACE_NAME } from "@release-change/shared";

import { displayCliOptions } from "./display-cli-options.js";

import { TAB } from "./constants.js";

/**
 * Shows the help for the `release-change` command.
 */
export const showHelp = (): void => {
  const logger = setLogger();
  const intro = "Runs automated package release and publishing";
  const usage = `Usage:\n${TAB}@${WORKSPACE_NAME}/cli [options]`;
  const cliOptions = displayCliOptions();
  const output = [intro, usage, cliOptions].join("\n".repeat(2));
  logger.logWithoutFormatting(output);
};
