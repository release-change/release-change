import { expect, it } from "vitest";

import { switchUrlToSshProtocol } from "../src/switch-url-to-ssh-protocol.js";

const mockedRemoteUrls = [
  "git@github.com:user-id/repo-name.git",
  "ssh://git@github.com/user-id/repo-name.git",
  "git+ssh://git@github.com/user-id/repo-name.git",
  "https://github.com/user-id/repo-name.git",
  "git+https://github.com/user-id/repo-name.git",
  "github:user-id/repo-name"
];
const expectedSshRemoteUrl = "ssh://git@github.com/user-id/repo-name.git";

it.each(mockedRemoteUrls)(
  'should return the URL "%s" according to the SSH protocol',
  mockedRemoteUrl => {
    expect(switchUrlToSshProtocol(mockedRemoteUrl)).toBe(expectedSshRemoteUrl);
  }
);
