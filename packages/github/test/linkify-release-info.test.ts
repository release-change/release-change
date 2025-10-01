import type { ReleaseInfo } from "@release-change/shared";

import { expect, it } from "vitest";

import { linkifyReleaseInfo } from "../src/linkify-release-info.js";

const mockedReleaseInfo: ReleaseInfo = {
  type: "github",
  name: "GitHub release",
  url: "https://github.com/user-id/repo-name/releases/tag/v1.0.0"
};

it("should return the release info as a link if the `url` property is defined", () => {
  expect(linkifyReleaseInfo(mockedReleaseInfo)).toBe(
    "[GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.0.0)"
  );
});
