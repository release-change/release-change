import { WORKSPACE_NAME } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { formatMessage } from "../src/format-message.js";
import { setLogger } from "../src/index.js";

const mockedDateTime = "2025-01-01T13:37:42Z";
const expectedTime = "13:37:42";
const debugMessage = "This is a message for debugging purpose.";
const infoMessage = "This is an informational message.";
const errorMessage = "This is an error message.";
const warningMessage = "This is a warning message.";
const successMessage = "This is a success message.";
const unformattedMessage = "This is a message without formatting.";

beforeEach(() => {
  vi.mock("../src/format-message.js", () => ({ formatMessage: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should display a message in debug mode with its own prefix", () => {
  const expectedOutput = `\x1b[1;34m[debug] ${WORKSPACE_NAME}:test\x1b[0m ${debugMessage}`;
  const mockedConsole = vi.spyOn(console, "debug").mockImplementationOnce(() => undefined);
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger(true).setDebugScope("test");
  setLogger(true).logDebug(debugMessage);
  expect(mockedConsole).toHaveBeenCalledWith(expectedOutput);
});
it("should display a message in debug mode without any prefix", () => {
  const expectedOutput = `\x1b[1;34m[debug] ${WORKSPACE_NAME}:\x1b[0m ${debugMessage}`;
  const mockedConsole = vi.spyOn(console, "debug").mockImplementationOnce(() => undefined);
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger(true).logDebug(debugMessage);
  expect(mockedConsole).toHaveBeenCalledWith(expectedOutput);
});
it("should display leading zeros for the time", () => {
  const expectedOutput = `[00:07:09] [${WORKSPACE_NAME}] \u203a \u2139 ${infoMessage}`;
  const mockedConsole = vi.spyOn(console, "info").mockImplementationOnce(() => undefined);
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date("2025-01-01T00:07:09Z").getTime());
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger().logInfo(infoMessage);
  expect(mockedConsole).toHaveBeenCalledWith(expectedOutput);
});
it("should display an info message to the console", () => {
  const expectedOutput = `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u2139 ${infoMessage}`;
  const mockedConsole = vi.spyOn(console, "info").mockImplementationOnce(() => undefined);
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger().logInfo(infoMessage);
  expect(mockedConsole).toHaveBeenCalledWith(expectedOutput);
});
it("should display an error message to the console", () => {
  const expectedOutput = `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u2718 ${errorMessage}`;
  const mockedConsole = vi.spyOn(console, "error").mockImplementationOnce(() => undefined);
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger().logError(errorMessage);
  expect(mockedConsole).toHaveBeenCalledWith("\x1b[1;31m%s\x1b[0m", expectedOutput);
});
it("should display a warning message to the console", () => {
  const expectedOutput = `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u26a0 ${warningMessage}`;
  const mockedConsole = vi.spyOn(console, "warn").mockImplementationOnce(() => undefined);
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger().logWarn(warningMessage);
  expect(mockedConsole).toHaveBeenCalledWith("\x1b[33m%s\x1b[0m", expectedOutput);
});
it("should display a success message to the console", () => {
  const expectedOutput = `[${expectedTime}] [${WORKSPACE_NAME}] \u203a \u2714 ${successMessage}`;
  const mockedConsole = vi.spyOn(console, "log").mockImplementationOnce(() => undefined);
  vi.spyOn(Date, "now").mockImplementationOnce(() => new Date(mockedDateTime).getTime());
  vi.mocked(formatMessage).mockImplementationOnce(() => expectedOutput);
  setLogger().logSuccess(successMessage);
  expect(mockedConsole).toHaveBeenCalledWith("\x1b[32m%s\x1b[0m", expectedOutput);
});
it("should display an unformatted message to the console", () => {
  const mockedConsole = vi.spyOn(console, "log").mockImplementationOnce(() => undefined);
  setLogger().logWithoutFormatting(unformattedMessage);
  expect(mockedConsole).toHaveBeenCalledWith(unformattedMessage);
});
