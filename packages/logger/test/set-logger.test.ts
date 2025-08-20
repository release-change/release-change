import { WORKSPACE_NAME } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import * as formatMessageModule from "../src/format-message.js";
import { setLogger } from "../src/index.js";

const logger = setLogger();
const mockedDateTime = "2025-01-01T13:37:42Z";
const expectedTime = "13:37:42";
const debugMessage = "This is a message for debugging purpose.";
const infoMessage = "This is an informational message.";
const errorMessage = "This is an error message.";
const warningMessage = "This is a warning message.";
const successMessage = "This is a success message.";
let originalConsoleDebug: typeof console.debug;
let originalConsoleInfo: typeof console.info;
let originalConsoleError: typeof console.error;
let originalConsoleWarn: typeof console.warn;
let originalConsoleLog: typeof console.log;

beforeEach(() => {
  originalConsoleDebug = console.debug;
  originalConsoleInfo = console.info;
  originalConsoleError = console.error;
  originalConsoleWarn = console.warn;
  originalConsoleLog = console.log;
  console.debug = vi.fn();
  console.info = vi.fn();
  console.error = vi.fn();
  console.warn = vi.fn();
  console.log = vi.fn();
});

afterEach(() => {
  console.debug = originalConsoleDebug;
  console.info = originalConsoleInfo;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  console.log = originalConsoleLog;
  vi.restoreAllMocks();
});

it("should display a message in debug mode with its own prefix", () => {
  const expectedOutput = `\x1b[1;34m[debug] ${WORKSPACE_NAME}:test\x1b[0m ${debugMessage}`;
  vi.spyOn(formatMessageModule, "formatMessage").mockImplementationOnce(() => expectedOutput);
  setLogger(true).setDebugScope("test");
  setLogger(true).logDebug(debugMessage);
  expect(console.debug).toHaveBeenCalledWith(expectedOutput);
});
it("should display a message in debug mode without any prefix", () => {
  const expectedOutput = `\x1b[1;34m[debug] ${WORKSPACE_NAME}:\x1b[0m ${debugMessage}`;
  vi.spyOn(formatMessageModule, "formatMessage").mockImplementationOnce(() => expectedOutput);
  setLogger(true).logDebug(debugMessage);
  expect(console.debug).toHaveBeenCalledWith(expectedOutput);
});
it("should display leading zeros for the time", () => {
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date("2025-01-01T00:07:09Z").getTime());
  logger.logInfo(infoMessage);
  expect(console.info).toHaveBeenCalledWith(
    `[00:07:09] [${WORKSPACE_NAME}] \u203a \u2139 ${infoMessage}`
  );
});
it("should display an info message to the console", () => {
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  logger.logInfo(infoMessage);
  expect(console.info).toHaveBeenCalledWith(
    `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u2139 ${infoMessage}`
  );
});
it("should display an error message to the console", () => {
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  logger.logError(errorMessage);
  expect(console.error).toHaveBeenCalledWith(
    "\x1b[1;31m%s\x1b[0m",
    `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u2718 ${errorMessage}`
  );
});
it("should display a warning message to the console", () => {
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  logger.logWarn(warningMessage);
  expect(console.warn).toHaveBeenCalledWith(
    "\x1b[33m%s\x1b[0m",
    `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u26a0 ${warningMessage}`
  );
});
it("should display a success message to the console", () => {
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  logger.logSuccess(successMessage);
  expect(console.log).toHaveBeenCalledWith(
    "\x1b[32m%s\x1b[0m",
    `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u2714 ${successMessage}`
  );
});
