import { displayOptions } from "../utils.js";
import { TAB } from "./constants.js";

/**
 * Shows the help for the `release-change` command.
 */
const showHelp = (): void => {
  const intro = "Runs automated package release and publishing";
  const usage = `Usage:\n${TAB}release-change [options]`;
  const options = displayOptions();
  const output = [intro, usage, options].join("\n".repeat(2));
  console.log(output);
};

export default showHelp;
