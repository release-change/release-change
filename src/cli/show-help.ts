import displayCliOptions from "./display-cli-options.js";

import { TAB } from "./constants.js";

import packageManager from "../../package.json" with { type: "json" };

/**
 * Shows the help for the `release-change` command.
 */
const showHelp = (): void => {
  const { name } = packageManager;
  const intro = "Runs automated package release and publishing";
  const usage = `Usage:\n${TAB}${name} [options]`;
  const cliOptions = displayCliOptions();
  const output = [intro, usage, cliOptions].join("\n".repeat(2));
  console.log(output);
};

export default showHelp;
