import { formatDetailedError } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { prepareReleaseNotes } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedPackages } from "./fixtures/mocked-packages.js";
import { mockedPackagesInMonorepo } from "./fixtures/mocked-packages-in-monorepo.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the target branch is not defined", () => {
  const expectedError = new Error(
    "Failed to prepare the release notes: The branch is not defined.",
    {
      cause: {
        title: "Failed to prepare the release notes",
        message: "The branch is not defined",
        details: {
          output: "branch: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    prepareReleaseNotes(
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.0",
        version: "1.2.0"
      },
      [],
      {
        ...mockedContext,
        branch: undefined
      }
    )
  ).toThrowError(expectedError);
});
it("should throw an error if the target branch is not supported by the configuration", () => {
  const expectedError = new Error(
    "Failed to prepare the release notes: The branch unknown is not defined in the configuration.",
    {
      cause: {
        title: "Failed to prepare the release notes",
        message: "The branch unknown is not defined in the configuration.",
        details: {
          output: "branchConfig: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    prepareReleaseNotes(
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.0",
        version: "1.2.0"
      },
      [],
      {
        ...mockedContext,
        branch: "unknown"
      }
    )
  ).toThrowError(expectedError);
});
it("should throw an error if no last release is defined", () => {
  const expectedError = new Error(
    "Failed to prepare the release notes: The last release is not defined.",
    {
      cause: {
        title: "Failed to prepare the release notes",
        message: "The last release is not defined.",
        details: {
          output: "lastRelease: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    prepareReleaseNotes(
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.0",
        version: "1.2.0"
      },
      [],
      { ...mockedContext, branch: "main" }
    )
  ).toThrowError(expectedError);
});
it("should throw an error if the target package has no last release", () => {
  const expectedError = new Error(
    "Failed to prepare the release notes: No last release found for root package.",
    {
      cause: {
        title: "Failed to prepare the release notes",
        message: "No last release found for root package.",
        details: {
          output: "packageLastRelease: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    prepareReleaseNotes(
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.0",
        version: "1.2.0"
      },
      [],
      {
        ...mockedContext,
        branch: "main",
        lastRelease: {
          ref: null,
          packages: []
        }
      }
    )
  ).toThrowError(expectedError);
});
it("should throw an error if no commits have been retrieved", () => {
  const expectedError = new Error(
    "Failed to prepare the release notes: No commits have been retrieved.",
    {
      cause: {
        title: "Failed to prepare the release notes",
        message: "No commits have been retrieved.",
        details: {
          output: "commits: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    prepareReleaseNotes(
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.0",
        version: "1.2.0"
      },
      [],
      {
        ...mockedContext,
        branch: "main",
        lastRelease: {
          ref: null,
          packages: [
            {
              name: "",
              pathname: ".",
              gitTag: "v1.1.0",
              version: "1.1.0"
            }
          ]
        }
      }
    )
  ).toThrowError(expectedError);
});
it.each(mockedPackages)(
  "should prepare release notes for branch $branch, from $lastReleasePackage.gitTag to $nextReleasePackage.gitTag",
  ({ branch, commits, lastReleasePackage, nextReleasePackage, expectedReleaseNotes }) => {
    assert.deepEqual(
      prepareReleaseNotes(nextReleasePackage, [], {
        ...mockedContext,
        branch,
        lastRelease: { ref: null, packages: [lastReleasePackage] },
        commits
      }),
      expectedReleaseNotes
    );
  }
);
it.each(mockedPackagesInMonorepo)(
  "should prepare release notes in a monorepo context for branch $branch, from $lastReleasePackage.gitTag to $nextReleasePackage.gitTag",
  ({
    branch,
    commits,
    packageDependencies,
    nextReleasePackageDependencies,
    lastReleasePackage,
    nextReleasePackage,
    expectedReleaseNotes
  }) => {
    assert.deepEqual(
      prepareReleaseNotes(nextReleasePackage, packageDependencies, {
        ...mockedContextInMonorepo,
        branch,
        lastRelease: {
          ref: null,
          packages: [
            lastReleasePackage,
            {
              name: "@monorepo/b",
              pathname: "packages/b",
              gitTag: "null",
              version: "1.0.0"
            }
          ]
        },
        nextRelease: [nextReleasePackage, ...nextReleasePackageDependencies],
        commits
      }),
      expectedReleaseNotes
    );
  }
);
