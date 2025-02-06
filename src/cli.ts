import type { Args, CommandOption, ParsedOptions } from "./types.js";

import process from "node:process";

import { TAB } from "./utils.js";

import packageManager from "../package.json" with { type: "json" };

const availableOptions = {
  branches: {
    optionName: "branches",
    flag: "--branches",
    alias: "-b",
    description: "Git branches to release from",
    type: "array"
  },
  repositoryUrl: {
    optionName: "repositoryUrl",
    flag: "--repository-url",
    alias: "-r",
    description: "Git repository URL",
    type: "string"
  },
  debug: {
    optionName: "debug",
    flag: "--debug",
    description: "Output debugging information",
    type: "boolean"
  },
  dryRun: {
    optionName: "dryRun",
    flag: "--dry-run",
    alias: "-d",
    description: "Skip release and publishing",
    type: "boolean"
  },
  version: {
    optionName: "version",
    flag: "--version",
    alias: "-v",
    description: "Show version number",
    type: "boolean"
  },
  help: {
    optionName: "help",
    flag: "--help",
    alias: "-h",
    description: "Show help",
    type: "boolean"
  }
} as const;
const allowedCommandOptions = Object.values(availableOptions).reduce(
  (acc, option) => {
    acc[option.flag] = option;
    if ("alias" in option && option.alias) {
      acc[option.alias] = option;
    }
    return acc;
  },
  {} as Record<CommandOption, (typeof availableOptions)[keyof typeof availableOptions]>
);

/**
 * Parses the options run from the CLI.
 * @param args - The arguments from the process.
 * @return The options as defined by `availableOptions`.
 */
export const parseOptions = (args: Args): ParsedOptions => {
  const parsedOptions: ParsedOptions = {};
  let currentOption: keyof typeof availableOptions | null = null;
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
        const parsedOption = parsedOptions[currentOption];
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

/**
 * Displays the available options for `--help` command output.
 */
const displayOptions = (): string => {
  const availableOptionsValues = Object.values(availableOptions);
  const aliasMaxLength = Math.max(
    ...availableOptionsValues.map(option => ("alias" in option ? option.alias.length : 0))
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
 * Shows the help for the `release-change` command.
 */
export const showHelp = (): void => {
  const intro = "Runs automated package release and publishing";
  const usage = `Usage:\n${TAB}release-change [options]`;
  const options = displayOptions();
  const output = [intro, usage, options].join("\n".repeat(2));
  console.log(output);
};

/**
 * Shows the current version of `release-change`.
 */
export const showVersion = (): void => console.log(`v${packageManager.version}`);

/**
 * Runs the CLI
 * @return The exit code.
 */
const cli = (): number => {
  const args = process.argv.slice(2) as Args;
  const parsedOptions = parseOptions(args);
  const { help, version, ...options } = parsedOptions;
  if (help) {
    showHelp();
    return 0;
  }
  if (version) {
    showVersion();
    return 0;
  }
  console.log(help, version, options);
  return 0;
};

export default cli;
