import childProcess from "node:child_process";

import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { showHelp } from "../src/show-help.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const expectedOutput = `Runs automated package release and publishing

Usage:
  @release-change/cli [options]

Options
  -b, --branches        Git branches to release from    [array]
  -r, --repository-url  Git repository URL             [string]
      --remote-name     Remote Git repository name     [string]
      --debug           Output debugging information  [boolean]
  -d, --dry-run         Skip release and publishing   [boolean]
  -v, --version         Show version number           [boolean]
  -h, --help            Show help                     [boolean]`;
const cliOptions = ["-h", "--help"];

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(cliOptions)("should display the help content when using the `%s` command", option => {
  vi.spyOn(childProcess, "execSync").mockReturnValue(`npx @release-change/cli ${option}`);
  showHelp();
  expect(mockedLogger.logWithoutFormatting).toHaveBeenCalledWith(expectedOutput);
});
