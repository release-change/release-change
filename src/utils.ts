import type { Args, CommandOption, ParsedOptions } from "./types.js";

import { AVAILABLE_OPTIONS, TAB } from "./utils/constants.js";

/**
 * Display the options when running the CLI with the `--help` or `-h` options.
 * @return The options, with their alias (if available), flag, description and type.
 */
export const displayOptions = (): string => {
  const availableOptionsValues = Object.values(AVAILABLE_OPTIONS);
  const aliasMaxLength = Math.max(
    ...availableOptionsValues.map(option =>
      "alias" in option && option.alias ? option.alias.length : 0
    )
  );
  const flagMaxLength = Math.max(...availableOptionsValues.map(option => option.flag.length));
  const descriptionMaxLength = Math.max(
    ...availableOptionsValues.map(option => option.description.length)
  );
  const typeMaxLength = Math.max(...availableOptionsValues.map(option => option.type.length)) + 2;
  const header = "Options";
  const options: string[] = [];
  for (const option of availableOptionsValues) {
    const alias = "alias" in option ? `${option.alias}, ` : " ".repeat(aliasMaxLength + 2);
    const optionName = `${TAB}${alias}${option.flag.padEnd(flagMaxLength, " ")}`;
    const description = `${option.description.padEnd(descriptionMaxLength, " ")}`;
    const type = `[${option.type}]`.padStart(typeMaxLength, " ");
    const optionElements = [optionName, description, type];
    options.push(optionElements.join(TAB));
  }
  return `${header}\n${options.join("\n")}`;
};

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
