import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { setBranchName } from "../src/index.js";
import { mockedBranchNames } from "./fixtures/mocked-branch-names.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error when the target branch name is not defined", () => {
  const expectedError = new Error(
    "Failed to set the branch name: The target branch must be defined.",
    {
      cause: {
        title: "Failed to set the branch name",
        message: "The target branch must be defined.",
        details: {
          output: "branch: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => setBranchName(undefined, [])).toThrowError(expectedError);
});
it("should throw an error when the target branch name is an empty string", () => {
  const expectedError = new Error(
    "Failed to set the branch name: The target branch must be defined.",
    {
      cause: {
        title: "Failed to set the branch name",
        message: "The target branch must be defined.",
        details: {
          output: "branch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => setBranchName("", [])).toThrowError(expectedError);
});
it("should throw an error when there are no next releases", () => {
  const expectedError = new Error(
    "Failed to set the branch name: There must be at least one next release.",
    {
      cause: {
        title: "Failed to set the branch name",
        message: "There must be at least one next release.",
        details: {
          output: "nextRelease.length: 0"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => setBranchName("branch", [])).toThrowError(expectedError);
});
it.each(mockedBranchNames)("should set branch name as $expected", ({
  branch,
  nextRelease,
  expected
}) => {
  expect(setBranchName(branch, nextRelease)).toBe(expected);
});
