import { assert, it } from "vitest";

import { prepareReleaseNotes } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedPackages } from "./fixtures/mocked-packages.js";
import { mockedPackagesInMonorepo } from "./fixtures/mocked-packages-in-monorepo.js";

// TODO: for each mocked package, test:
/*
- for each target branch (main, alpha, beta, next):
  - for each last release (release, alpha, beta, rc):
    - for each release type (major, minor, patch):
      - next release, expected release notes
 */
it("should throw an error if the target branch is not defined", () => {
  assert.throws(
    () =>
      prepareReleaseNotes(
        {
          name: "",
          pathname: ".",
          gitTag: "v1.2.0",
          version: "1.2.0"
        },
        {
          ...mockedContext,
          branch: undefined
        }
      ),
    "The branch is not defined."
  );
});
it("should throw an error if the target branch is not supported by the configuration", () => {
  assert.throws(
    () =>
      prepareReleaseNotes(
        {
          name: "",
          pathname: ".",
          gitTag: "v1.2.0",
          version: "1.2.0"
        },
        {
          ...mockedContext,
          branch: "unknown"
        }
      ),
    "The branch unknown is not defined in the configuration."
  );
});
it("should throw an error if no last release is defined", () => {
  assert.throws(
    () =>
      prepareReleaseNotes(
        {
          name: "",
          pathname: ".",
          gitTag: "v1.2.0",
          version: "1.2.0"
        },
        { ...mockedContext, branch: "main" }
      ),
    "The last release is not defined."
  );
});
it("should throw an error if the target package has no last release", () => {
  assert.throws(
    () =>
      prepareReleaseNotes(
        {
          name: "",
          pathname: ".",
          gitTag: "v1.2.0",
          version: "1.2.0"
        },
        {
          ...mockedContext,
          branch: "main",
          lastRelease: {
            ref: null,
            packages: []
          }
        }
      ),
    "No last release found for root package."
  );
});
it("should throw an error if no commits have been retrieved", () => {
  assert.throws(
    () =>
      prepareReleaseNotes(
        {
          name: "",
          pathname: ".",
          gitTag: "v1.2.0",
          version: "1.2.0"
        },
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
      ),
    "No commits have been retrieved."
  );
});
it.each(mockedPackages)(
  "should prepare release notes for branch $branch, from $lastReleasePackage.gitTag to $nextReleasePackage.gitTag",
  ({ branch, commits, lastReleasePackage, nextReleasePackage, expectedReleaseNotes }) => {
    assert.deepEqual(
      prepareReleaseNotes(nextReleasePackage, {
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
  ({ branch, commits, lastReleasePackage, nextReleasePackage, expectedReleaseNotes }) => {
    assert.deepEqual(
      prepareReleaseNotes(nextReleasePackage, {
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
        commits
      }),
      expectedReleaseNotes
    );
  }
);
