export const TAB = " ".repeat(2);
export const GIT_MIN_VERSION = "2.48.1";
export const AVAILABLE_OPTIONS = {
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
