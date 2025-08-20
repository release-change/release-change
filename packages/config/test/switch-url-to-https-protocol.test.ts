import { expect, it } from "vitest";

import { switchUrlToHttpsProtocol } from "../src/switch-url-to-https-protocol.js";
import { mockedRemoteUrls } from "./fixtures/mocked-remote-urls.js";

const expectedHttpsRemoteUrl = "https://github.com/user-id/repo-name.git";

it.each(mockedRemoteUrls)(
  'should return the URL "%s" according to the HTTPS protocol',
  mockedRemoteUrl => {
    expect(switchUrlToHttpsProtocol(mockedRemoteUrl)).toBe(expectedHttpsRemoteUrl);
  }
);
