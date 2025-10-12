/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the API is used> */
import { getRepositoryRelatedEntryPoint } from "@release-change/github";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { formatReleaseNotesBody } from "../src/format-release-notes-body.js";
import { createReleaseNotes } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedReleaseNotesBodies } from "./fixtures/mocked-release-notes-bodies.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";
import { mockedUri } from "./fixtures/mocked-uri.js";

const mockedReleaseNotes = [
  {
    releaseNotes: {
      tagName: "v1.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true
    },
    requestBody: {
      tag_name: "v1.0.0-alpha.1",
      target_commitish: "alpha",
      name: "v1.0.0-alpha.1",
      prerelease: true,
      make_latest: false
    }
  },
  {
    releaseNotes: {
      tagName: "v1.0.0",
      target: "main",
      isPrerelease: false
    },
    requestBody: {
      tag_name: "v1.0.0",
      target_commitish: "main",
      name: "v1.0.0",
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
  vi.mock("../src/format-release-notes-body.js", () => ({ formatReleaseNotesBody: vi.fn() }));
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
//       { tagName: "v1.0.0", target: "main", isPrerelease: true, body: {} },
//       {
//         ...mockedContext,
//         env: mockedEnv
//       }
//     )
//   ).rejects.toThrow("Failed to request the URI.");
// });
// it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
//   vi.mocked(mockedFetch).mockResolvedValue({
//     ...response,
//     json: () => Promise.resolve({ message: response.statusText })
//   });
//   await expect(
//     createReleaseNotes(
//       { tagName: "v1.0.0", target: "main", isPrerelease: true, body: {} },
//       {
//         ...mockedContext,
//         env: mockedEnv
//       }
//     )
//   ).rejects.toThrow(expectedError);
//   expect(process.exitCode).toBe(response.status);
// });
describe.each(mockedReleaseNotes)(
  "for $releaseNotes.tagName",
  async ({ releaseNotes, requestBody }) => {
    it.each(mockedReleaseNotesBodies)(
      "should create release notes for $body",
      async ({ body, formattedBody }) => {
        const context = {
          ...mockedContext,
          env: mockedEnv
        };
        vi.mocked(formatReleaseNotesBody).mockReturnValue(formattedBody);
        vi.mocked(mockedFetch).mockResolvedValue({
          status: 201
        });
        await createReleaseNotes(
          {
            ...releaseNotes,
            body
          },
          context
        );
        // TODO: uncomment when the API is used
        // expect(mockedFetch).toHaveBeenCalledWith(mockedUri, {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/vnd.github+json",
        //     Authorization: `Bearer ${mockedEnv.RELEASE_TOKEN}`,
        //     "Content-Type": "application/json",
        //     "X-GitHub-Api-Version": "2022-11-28"
        //   },
        //   body: JSON.stringify({
        //     ...requestBody,
        //     body: formattedBody
        //   })
        // });
        // assert.deepNestedInclude(context.releaseInfos, {
        //   type: "github",
        //   name: "GitHub release",
        //   url: `${mockedRepositoryUrl}/releases/tag/${releaseNotes.tagName}`
        // });
      }
    );
  }
);
