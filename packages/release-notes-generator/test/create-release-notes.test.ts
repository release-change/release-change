/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the API is used> */
import { getRepositoryRelatedEntryPoint } from "@release-change/github";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { createReleaseNotes } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";
import { mockedUri } from "./fixtures/mocked-uri.js";

const mockedBody = `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`;
const mockedReleaseNotes = [
  {
    releaseNotes: {
      tagName: "v1.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: mockedBody
    },
    requestBody: {
      tag_name: "v1.0.0-alpha.1",
      target_commitish: "alpha",
      name: "v1.0.0-alpha.1",
      body: mockedBody,
      prerelease: true,
      make_latest: false
    }
  },
  {
    releaseNotes: {
      tagName: "v1.0.0",
      target: "main",
      isPrerelease: false,
      body: mockedBody
    },
    requestBody: {
      tag_name: "v1.0.0",
      target_commitish: "main",
      name: "v1.0.0",
      body: mockedBody,
      prerelease: false,
      make_latest: true
    }
  }
];
const mockedEnv = {
  RELEASE_TOKEN: "release-token"
};

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("@release-change/github", () => ({ getRepositoryRelatedEntryPoint: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(
    "https://api.github.com/repos/user-id/repo-name"
  );
});
afterEach(() => {
  vi.clearAllMocks();
});

// TODO: uncomment when the API is used
// it("should throw an error when the request fails", async () => {
//   vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
//   await expect(
//     createReleaseNotes(
//       { tagName: "v1.0.0", target: "main", isPrerelease: true, body: "" },
//       {
//         ...mockedContext,
//         env: mockedEnv
//       }
//     )
//   ).rejects.toThrow("Failed to request the URI.");
// });
// it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
//   vi.mocked(mockedFetch).mockResolvedValue(response);
//   await expect(
//     createReleaseNotes(
//       { tagName: "v1.0.0", target: "main", isPrerelease: true, body: "" },
//       {
//         ...mockedContext,
//         env: mockedEnv
//       }
//     )
//   ).rejects.toThrow(expectedError);
//   expect(process.exitCode).toBe(response.status);
// });
it.each(mockedReleaseNotes)(
  "should create release notes for $releaseNotes.tagName",
  async ({ releaseNotes, requestBody }) => {
    const context = {
      ...mockedContext,
      env: mockedEnv
    };
    vi.mocked(mockedFetch).mockResolvedValue({
      status: 201
    });
    await createReleaseNotes(releaseNotes, context);
    // TODO: uncomment when the API is used
    // expect(mockedFetch).toHaveBeenCalledWith(mockedUri, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/vnd.github+json",
    //     Authorization: `Bearer ${mockedEnv.RELEASE_TOKEN}`,
    //     "X-GitHub-Api-Version": "2022-11-28"
    //   },
    //   body: JSON.stringify(requestBody)
    // });
    // assert.deepEqual(context.releaseInfos, [
    //   {
    //     type: "github",
    //     name: "GitHub release",
    //     url: `${mockedRepositoryUrl}/releases/tag/${releaseNotes.tagName}`
    //   }
    // ]);
  }
);
