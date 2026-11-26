import { expect, it, vi } from "vitest";

import { getUser } from "../src/get-user.js";
import { setCommitterEmail } from "../src/index.js";
import { mockedToken } from "./fixtures/mocked-token.js";
import { mockedUsers } from "./fixtures/mocked-users.js";

import { DEFAULT_COMMITTER_EMAIL } from "../src/constants.js";

vi.mock("../src/constants.js", () => ({
  DEFAULT_COMMITTER_EMAIL: "293970894+release-change[bot]@users.noreply.github.com"
}));
vi.mock("../src/get-user.js", () => ({
  getUser: vi.fn()
}));

it.each(mockedUsers)(
  "should return the generic GitHub e-mail address of the GitHub user if id and login are available",
  async ({ user, expectedCommitterEmail }) => {
    vi.mocked(getUser).mockResolvedValue(user);
    expect(await setCommitterEmail({ RELEASE_TOKEN: mockedToken })).toBe(expectedCommitterEmail);
  }
);
it("should return the default committer e-mail if the GitHub user login is not available", async () => {
  vi.mocked(getUser).mockResolvedValue(null);
  expect(await setCommitterEmail({ RELEASE_TOKEN: mockedToken })).toBe(DEFAULT_COMMITTER_EMAIL);
});
