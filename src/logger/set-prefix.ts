import addLeadingZero from "./add-leading-zero.js";

import packageManager from "../../package.json" with { type: "json" };

/**
 * Sets prefix pour messages logged to the console.
 * @param timestamp - The timestamp when the message is logged.
 * @return The prefix in the following format: `[HH:MM:SS] [<package name>] \u203a`
 */
const setPrefix = (timestamp: number) => {
  const hours = addLeadingZero(new Date(timestamp).getUTCHours());
  const minutes = addLeadingZero(new Date(timestamp).getUTCMinutes());
  const seconds = addLeadingZero(new Date(timestamp).getUTCSeconds());
  return `[${hours}:${minutes}:${seconds}] [${packageManager.name}] \u203a`;
};

export default setPrefix;
