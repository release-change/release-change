import { formatDetailedError, parsePathname } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getRepositoryRelatedEntryPoint } from "../src/index.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    parsePathname: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error when the repository URL is malformed", () => {
  const expectedError = new Error(
    "Failed to get the repository-related entry point: Malformed repository URL: no owner or repository found.",
    {
      cause: {
        title: "Failed to get the repository-related entry point",
        message: "Malformed repository URL: no owner or repository found.",
        details: {
          output: "https://github.com"
        }
      }
    }
  );
  vi.mocked(parsePathname).mockReturnValue(null);
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => getRepositoryRelatedEntryPoint("https://github.com")).toThrowError(expectedError);
});
it("should return the API URL when the repository URL is valid", () => {
  vi.mocked(parsePathname).mockReturnValue({
    owner: "user-id",
    repository: "repo-name"
  });
  expect(getRepositoryRelatedEntryPoint("https://github.com/user-id/repo-name.git")).toBe(
    "https://api.github.com/repos/user-id/repo-name"
  );
});
