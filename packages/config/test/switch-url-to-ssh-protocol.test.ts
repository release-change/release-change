import { expect, it } from "vitest";

import { switchUrlToSshProtocol } from "../src/switch-url-to-ssh-protocol.js";
import { mockedRemoteUrls } from "./fixtures/mocked-remote-urls.js";

const expectedSshRemoteUrl = "ssh://git@github.com/user-id/repo-name.git";

it.each(mockedRemoteUrls)(
  'should return the URL "%s" according to the SSH protocol',
  mockedRemoteUrl => {
    expect(switchUrlToSshProtocol(mockedRemoteUrl)).toBe(expectedSshRemoteUrl);
  }
);
