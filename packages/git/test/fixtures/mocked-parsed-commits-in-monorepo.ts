import type { Commit } from "@release-change/commit-analyser";

export const mockedParsedCommitsInMonorepo: Commit[] = [
  {
    description: "feat(release): set last release (#75)",
    footer: []
  },
  {
    description: "test(release): refactor the code getting the latest valid Git tag",
    footer: [],
    modifiedFiles: ["packages/release/test/get-latest-valid-git-tag.test.ts"]
  },
  {
    description: "refactor(release): refactor the code getting the latest valid Git tag",
    footer: [],
    modifiedFiles: ["packages/release/src/get-latest-valid-git-tag.ts"]
  },
  {
    description: "test(release): set last release",
    footer: [],
    modifiedFiles: ["packages/release/test/set-last-release.test.ts"]
  },
  {
    description: "feat(release): set last release",
    footer: [],
    modifiedFiles: ["packages/release/src/set-last-release.ts"]
  },
  {
    description:
      "test(git): remove test checking the return `false` if the package cannot publish from the branch",
    footer: [],
    modifiedFiles: ["packages/git/test/file.test.ts"]
  },
  {
    description: "refactor(git): stop checking if the package can publish from branch",
    footer: [],
    modifiedFiles: ["packages/git/src/file.ts"]
  },
  {
    description: "refactor(config): add `version` optional property to type `Package`",
    footer: [],
    modifiedFiles: ["packages/config/src/config.types.ts"]
  }
];
