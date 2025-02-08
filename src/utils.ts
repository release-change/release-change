import type { Args, CommandOption, ParsedOptions } from "./types.js";

import { AVAILABLE_OPTIONS } from "./utils/constants.js";

/**
 * Parses the options run from the CLI.
 * @param args - The arguments from the process.
 * @return The options as defined by `availableOptions`.
 */
export const parseOptions = (args: Args): ParsedOptions => {
  const allowedCommandOptions = Object.values(AVAILABLE_OPTIONS).reduce(
    (acc, option) => {
      acc[option.flag] = option as (typeof AVAILABLE_OPTIONS)[keyof typeof AVAILABLE_OPTIONS];
      if ("alias" in option && option.alias) {
        acc[option.alias] = option as (typeof AVAILABLE_OPTIONS)[keyof typeof AVAILABLE_OPTIONS];
      }
      return acc;
    },
    {} as Record<CommandOption, (typeof AVAILABLE_OPTIONS)[keyof typeof AVAILABLE_OPTIONS]>
  );
  const parsedOptions: ParsedOptions = {};
  let currentOption: keyof typeof AVAILABLE_OPTIONS | null = null;
  for (const arg of args) {
    if (arg.startsWith("-")) {
      if (!(arg in allowedCommandOptions)) continue;
      const allowedCommandOption = allowedCommandOptions[arg as CommandOption];
      if (allowedCommandOption) {
        const { optionName, type } = allowedCommandOption;
        currentOption = optionName;
        switch (type) {
          case "array":
            Object.assign(parsedOptions, { [currentOption]: [] });
            break;
          case "string":
            Object.assign(parsedOptions, { [currentOption]: "" });
            break;
          default:
            Object.assign(parsedOptions, { [currentOption]: true });
            break;
        }
      }
    } else {
      if (currentOption && currentOption in parsedOptions) {
        const parsedOption = parsedOptions[currentOption as keyof ParsedOptions];
        if (typeof parsedOption !== "undefined") {
          if (Array.isArray(parsedOption)) parsedOption.push(arg);
          else if (typeof parsedOption === "string")
            Object.assign(parsedOptions, { [currentOption]: arg });
        }
      }
    }
  }
  return parsedOptions;
};
