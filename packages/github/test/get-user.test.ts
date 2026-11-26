import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";
import { assert, expect, it, vi } from "vitest";

import { getUser } from "../src/get-user.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedToken } from "./fixtures/mocked-token.js";

global.fetch = mockedFetch;

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  GITHUB_API_VERSION: "2026-03-10",
  GITHUB_API_ACCEPT_HEADER: "application/vnd.github+json"
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
  vi.mocked(mockedFetch).mockResolvedValue({
    ...response,
    json: () => Promise.resolve({ message: response.statusText })
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(getUser({ RELEASE_TOKEN: mockedToken })).rejects.toThrow(expectedError);
  expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to get user.");
  expect(process.exitCode).toBe(response.status);
});
it("should return `null` if the response status is 304", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    status: 304,
    statusText: "Not Modified",
    json: () => Promise.resolve({ message: "Not Modified" })
  });
  const user = await getUser({ RELEASE_TOKEN: mockedToken });
  expect(user).toBeNull();
});
it("should return the login and the id if the response status is 200", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve({ login: "release-change[bot]", id: 123456 })
  });
  const user = await getUser({ RELEASE_TOKEN: mockedToken });
  assert.deepEqual(user, { login: "release-change[bot]", id: 123456 });
});
