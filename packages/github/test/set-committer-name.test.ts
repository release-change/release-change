import { expect, it, vi } from "vitest";

import { getUser } from "../src/get-user.js";
import { setCommitterName } from "../src/index.js";
import { mockedToken } from "./fixtures/mocked-token.js";
import { mockedUsers } from "./fixtures/mocked-users.js";

import { DEFAULT_COMMITTER_NAME } from "../src/constants.js";

vi.mock("../src/constants.js", () => ({
  DEFAULT_COMMITTER_NAME: "release-change[bot]"
}));
vi.mock("../src/get-user.js", () => ({
  getUser: vi.fn()
}));

it.each(mockedUsers)(
  "should return the login of the GitHub user if available",
  async ({ user, expectedCommitterName }) => {
    vi.mocked(getUser).mockResolvedValue(user);
    expect(await setCommitterName({ RELEASE_TOKEN: mockedToken })).toBe(expectedCommitterName);
  }
);
it("should return the default committer name if the GitHub user login is not available", async () => {
  vi.mocked(getUser).mockResolvedValue(null);
  expect(await setCommitterName({ RELEASE_TOKEN: mockedToken })).toBe(DEFAULT_COMMITTER_NAME);
});
