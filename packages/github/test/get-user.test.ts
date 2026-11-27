import { setLogger } from "@release-change/logger";
import { assert, expect, it, vi } from "vitest";

import { getUser } from "../src/get-user.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedToken } from "./fixtures/mocked-token.js";

global.fetch = mockedFetch;

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn()
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

it("should throw an error when the response has errors", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () =>
      Promise.resolve({
        errors: [
          {
            message: "Error message 1"
          },
          {
            message: "Error message 2"
          }
        ]
      })
  });
  await expect(getUser({ RELEASE_TOKEN: mockedToken })).rejects.toThrow(
    "The GitHub API failed to provide information about the used login and ID."
  );
  expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to get user.");
});
it("should return `null` when the response is an empty object", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () => Promise.resolve({})
  });
  expect(await getUser({ RELEASE_TOKEN: mockedToken })).toBeNull();
});
it("should return the login and the id", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () =>
      Promise.resolve({ data: { viewer: { login: "release-change[bot]", databaseId: 123456 } } })
  });
  const user = await getUser({ RELEASE_TOKEN: mockedToken });
  assert.deepEqual(user, { login: "release-change[bot]", id: 123456 });
  expect(mockedFetch).toHaveBeenCalledWith("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mockedToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
query {
  viewer {
    login
    databaseId
  }
}
`
    })
  });
});
