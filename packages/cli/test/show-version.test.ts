import childProcess from "node:child_process";

import { setLogger } from "@release-change/logger";
import { WORKSPACE_VERSION } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { showVersion } from "../src/show-version.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const expectedVersion = WORKSPACE_VERSION;
const cliOptions = ["-v", "--version"];

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(
  cliOptions
)(`should display a message saying \`v${expectedVersion}\` when using the \`%s\` command`, cliOption => {
  vi.spyOn(childProcess, "execSync").mockReturnValue(`npx release-change ${cliOption}`);
  showVersion();
  expect(mockedLogger.logWithoutFormatting).toHaveBeenCalledWith(`v${expectedVersion}`);
});
