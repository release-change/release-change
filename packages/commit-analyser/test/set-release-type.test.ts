import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { setReleaseType } from "../src/index.js";
import {
  majorTypeCommits,
  majorTypeCommitsWithUpperCasePrefix,
  minorTypeCommits,
  minorTypeCommitsWithUpperCasePrefix,
  otherTypeCommits,
  otherTypeCommitsWithUpperCasePrefix,
  patchTypeCommits,
  patchTypeCommitsWithUpperCasePrefix
} from "./fixtures/mocked-commits-by-type.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const expectedMajorLogMessage = "The release type for the commit is major.";
const expectedMinorLogMessage = "The release type for the commit is minor.";
const expectedPatchLogMessage = "The release type for the commit is patch.";
const expectedNoReleaseLogMessage = "The commit does not trigger a release.";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(majorTypeCommits)(
  "should trigger a major release for commit $message and footer $footer",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe("major");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMajorLogMessage);
  }
);
it.each(minorTypeCommits)(
  "should trigger a minor release for commit $message",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe("minor");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMinorLogMessage);
  }
);
it.each(patchTypeCommits)(
  "should trigger a patch release for commit $message",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe("patch");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedPatchLogMessage);
  }
);
it.each(otherTypeCommits)(
  "should not trigger a release for commit $message",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe(null);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedNoReleaseLogMessage);
  }
);
it.each(majorTypeCommitsWithUpperCasePrefix)(
  "should trigger a major release for commit $message with upper case prefix",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe("major");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMajorLogMessage);
  }
);
it.each(minorTypeCommitsWithUpperCasePrefix)(
  "should trigger a minor release for commit $message with upper case prefix",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe("minor");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMinorLogMessage);
  }
);
it.each(patchTypeCommitsWithUpperCasePrefix)(
  "should trigger a patch release for commit $message with upper case prefix",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe("patch");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedPatchLogMessage);
  }
);
it.each(otherTypeCommitsWithUpperCasePrefix)(
  "should not trigger a release for commit $message with upper case prefix",
  ({ message, footer }) => {
    expect(setReleaseType(message, footer, mockedContext)).toBe(null);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedNoReleaseLogMessage);
  }
);
it("should not trigger a release for commits not following Conventional Commits syntax", () => {
  expect(
    setReleaseType("Commit not following Conventional Commits syntax", [], mockedContext)
  ).toBe(null);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedNoReleaseLogMessage);
});
