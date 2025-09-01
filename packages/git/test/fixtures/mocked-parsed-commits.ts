import type { Commit } from "@release-change/commit-analyser";

export const mockedParsedCommits: Commit[] = [
  {
    description: "feat(release): set last release (#75)",
    footer: []
  },
  {
    description: "test(release): refactor the code getting the latest valid Git tag",
    footer: []
  },
  {
    description: "refactor(release): refactor the code getting the latest valid Git tag",
    footer: []
  },
  {
    description: "test(release): set last release",
    footer: []
  },
  {
    description: "feat(release): set last release",
    footer: []
  },
  {
    description:
      "test(git): remove test checking the return `false` if the package cannot publish from the branch",
    footer: []
  },
  {
    description: "refactor(git): stop checking if the package can publish from branch",
    footer: []
  },
  {
    description: "refactor(config): add `version` optional property to type `Package`",
    footer: []
  }
];
