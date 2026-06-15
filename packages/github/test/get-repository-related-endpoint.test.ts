import { formatDetailedError, parsePathname } from "@release-change/shared";
import { expect, it, vi } from "vitest";

import { getRepositoryRelatedEndpoint } from "../src/index.js";

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  parsePathname: vi.fn()
}));

it("should throw an error when the repository URL is malformed", () => {
  const expectedError = new Error(
    "Failed to get the repository-related endpoint: Malformed repository URL: no owner or repository found.",
    {
      cause: {
        title: "Failed to get the repository-related endpoint",
        message: "Malformed repository URL: no owner or repository found.",
        details: {
          output: "https://github.com"
        }
      }
    }
  );
  vi.mocked(parsePathname).mockReturnValue(null);
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => getRepositoryRelatedEndpoint("https://github.com")).toThrow(expectedError);
});
it("should return the API URL when the repository URL is valid", () => {
  vi.mocked(parsePathname).mockReturnValue({
    owner: "user-id",
    repository: "repo-name"
  });
  expect(getRepositoryRelatedEndpoint("https://github.com/user-id/repo-name.git")).toBe(
    "https://api.github.com/repos/user-id/repo-name"
  );
});
