import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import logger from "../../src/logger/index.js";

import packageManager from "../../package.json" with { type: "json" };

describe("log messages to the console", () => {
  const mockedDateTime = "2025-01-01T13:37:42Z";
  const expectedTime = "13:37:42";
  const infoMessage = "This is an informational message.";
  const errorMessage = "This is an error message.";
  const warningMessage = "This is a warning message.";
  const successMessage = "This is a success message.";
  let originalConsoleInfo: typeof console.info;
  let originalConsoleError: typeof console.error;
  let originalConsoleWarn: typeof console.warn;
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    originalConsoleInfo = console.info;
    originalConsoleError = console.error;
    originalConsoleWarn = console.warn;
    originalConsoleLog = console.log;
    console.info = vi.fn();
    console.error = vi.fn();
    console.warn = vi.fn();
    console.log = vi.fn();
  });

  afterEach(() => {
    console.info = originalConsoleInfo;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.log = originalConsoleLog;
    vi.restoreAllMocks();
  });

  it("should display leading zeros for the time", () => {
    vi.spyOn(Date, "now").mockImplementationOnce(() => new Date("2025-01-01T00:07:09Z").getTime());
    logger.logInfo(infoMessage);
    expect(console.info).toHaveBeenCalledWith(
      `[00:07:09] [${packageManager.name}] \u203a \u2139 ${infoMessage}`
    );
  });
  it("should display an info message to the console", () => {
    vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
    logger.logInfo(infoMessage);
    expect(console.info).toHaveBeenCalledWith(
      `[${expectedTime}] [${packageManager.name}] \u203a \u2139 ${infoMessage}`
    );
  });
  it("should display an error message to the console", () => {
    vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
    logger.logError(errorMessage);
    expect(console.error).toHaveBeenCalledWith(
      "\x1b[1;31m%s\x1b[0m",
      `[${expectedTime}] [${packageManager.name}] \u203a \u2718 ${errorMessage}`
    );
  });
  it("should display a warning message to the console", () => {
    vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
    logger.logWarn(warningMessage);
    expect(console.warn).toHaveBeenCalledWith(
      "\x1b[33m%s\x1b[0m",
      `[${expectedTime}] [${packageManager.name}] \u203a \u26a0 ${warningMessage}`
    );
  });
  it("should display a success message to the console", () => {
    vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
    logger.logSuccess(successMessage);
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[32m%s\x1b[0m",
      `[${expectedTime}] [${packageManager.name}] \u203a \u2714 ${successMessage}`
    );
  });
});
