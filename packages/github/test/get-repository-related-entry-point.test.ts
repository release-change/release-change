import { parsePathname } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getRepositoryRelatedEntryPoint } from "../src/get-repository-related-entry-point.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ parsePathname: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error when the repository URL is malformed", () => {
  vi.mocked(parsePathname).mockReturnValue(null);
  assert.throws(
    () => getRepositoryRelatedEntryPoint("https://github.com"),
    "Malformed repository URL: no owner or repository found."
  );
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
