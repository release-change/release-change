import { mockedToken } from "./mocked-token.js";
import { mockedUri } from "./mocked-uri.js";

export const mockedCurlHeaders = [
  "-L",
  "-H",
  "Accept: application/vnd.github+json",
  "-H",
  `Authorization: Bearer ${mockedToken}`,
  "-H",
  "X-GitHub-Api-Version: 2022-11-28",
  mockedUri
];
