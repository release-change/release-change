import type { Args, CliOptionCommand, ParsedCliOptions } from "../types.js";

import { AVAILABLE_CLI_OPTIONS } from "./constants.js";

/**
 * Parses the CLI options run from the CLI.
 * @param args - The arguments from the process.
 * @return The CLI options as defined by `AVAILABLE_CLI_OPTIONS`.
 */
const parseCliOptions = (args: Args): ParsedCliOptions => {
  const allowedCliOptions = Object.values(AVAILABLE_CLI_OPTIONS).reduce(
    (acc, cliOption) => {
      acc[cliOption.flag] =
        cliOption as (typeof AVAILABLE_CLI_OPTIONS)[keyof typeof AVAILABLE_CLI_OPTIONS];
      if ("alias" in cliOption && cliOption.alias) {
        acc[cliOption.alias] =
          cliOption as (typeof AVAILABLE_CLI_OPTIONS)[keyof typeof AVAILABLE_CLI_OPTIONS];
      }
      return acc;
    },
    {} as Record<
      CliOptionCommand,
      (typeof AVAILABLE_CLI_OPTIONS)[keyof typeof AVAILABLE_CLI_OPTIONS]
    >
  );
  const parsedCliOptions: ParsedCliOptions = {};
  let currentCliOption: keyof typeof AVAILABLE_CLI_OPTIONS | null = null;
  for (const arg of args) {
    if (arg.startsWith("-")) {
      if (!(arg in allowedCliOptions)) continue;
      const allowedCliOption = allowedCliOptions[arg as CliOptionCommand];
      if (allowedCliOption) {
        const { cliOptionName, type } = allowedCliOption;
        currentCliOption = cliOptionName;
        switch (type) {
          case "array":
            Object.assign(parsedCliOptions, { [currentCliOption]: [] });
            break;
          case "string":
            Object.assign(parsedCliOptions, { [currentCliOption]: "" });
            break;
          default:
            Object.assign(parsedCliOptions, { [currentCliOption]: true });
            break;
        }
      }
    } else {
      if (currentCliOption && currentCliOption in parsedCliOptions) {
        const parsedCliOption = parsedCliOptions[currentCliOption as keyof ParsedCliOptions];
        if (typeof parsedCliOption !== "undefined") {
          if (Array.isArray(parsedCliOption)) parsedCliOption.push(arg);
          else if (typeof parsedCliOption === "string")
            Object.assign(parsedCliOptions, { [currentCliOption]: arg });
        }
      }
    }
  }
  return parsedCliOptions;
};

export default parseCliOptions;
