import { describe, expect, it } from "vitest";

import { switchUrlToHttpsProtocol } from "../../src/config/switch-url-to-https-protocol.js";

describe("switch URL to HTTPS protocol", () => {
  const mockedRemoteUrls = [
    "git@github.com:user-id/repo-name.git",
    "ssh://git@github.com/user-id/repo-name.git",
    "git+ssh://git@github.com/user-id/repo-name.git",
    "https://github.com/user-id/repo-name.git",
    "git+https://github.com/user-id/repo-name.git",
    "github:user-id/repo-name"
  ];
  const expectedHttpsRemoteUrl = "https://github.com/user-id/repo-name.git";

  it.each(mockedRemoteUrls)(
    'should return the URL "%s" according to the HTTPS protocol',
    mockedRemoteUrl => {
      expect(switchUrlToHttpsProtocol(mockedRemoteUrl)).toBe(expectedHttpsRemoteUrl);
    }
  );
});
