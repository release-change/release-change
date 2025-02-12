export const TAB = " ".repeat(2);
export const AVAILABLE_CLI_OPTIONS = {
  branches: {
    cliOptionName: "branches",
    flag: "--branches",
    alias: "-b",
    description: "Git branches to release from",
    type: "array"
  },
  repositoryUrl: {
    cliOptionName: "repositoryUrl",
    flag: "--repository-url",
    alias: "-r",
    description: "Git repository URL",
    type: "string"
  },
  debug: {
    cliOptionName: "debug",
    flag: "--debug",
    description: "Output debugging information",
    type: "boolean"
  },
  dryRun: {
    cliOptionName: "dryRun",
    flag: "--dry-run",
    alias: "-d",
    description: "Skip release and publishing",
    type: "boolean"
  },
  version: {
    cliOptionName: "version",
    flag: "--version",
    alias: "-v",
    description: "Show version number",
    type: "boolean"
  },
  help: {
    cliOptionName: "help",
    flag: "--help",
    alias: "-h",
    description: "Show help",
    type: "boolean"
  }
} as const;
