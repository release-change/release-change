import { getReleaseToken } from "@release-change/ci";
import { afterEach, assert, beforeEach, it, vi } from "vitest";

import { setCurlHeaders } from "../src/set-curl-headers.js";
import { mockedCurlHeaders } from "./fixtures/mocked-curl-headers.js";
import { mockedToken } from "./fixtures/mocked-token.js";
import { mockedUri } from "./fixtures/mocked-uri.js";

beforeEach(() => {
  vi.mock("@release-change/ci", () => ({ getReleaseToken: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the release token is not defined", () => {
  vi.mocked(getReleaseToken).mockImplementation(() => {
    throw new Error("The release token is not defined.");
  });
  assert.throws(() => setCurlHeaders({}, mockedUri), "The release token is not defined.");
});
it("should return the headers", () => {
  vi.mocked(getReleaseToken).mockReturnValue(mockedToken);
  assert.deepEqual(
    setCurlHeaders(
      {
        RELEASE_TOKEN: mockedToken
      },
      mockedUri
    ),
    mockedCurlHeaders
  );
});
