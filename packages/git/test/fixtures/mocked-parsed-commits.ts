import type { Commit } from "@release-change/commit-analyser";

export const mockedParsedCommits: Commit[] = [
  {
    sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
    description: "feat(release): set last release (#75)",
    body: [],
    footer: []
  },
  {
    sha: "72f01b737cc5308bda1a7035c56a95987187f0bc",
    description: "test(release): refactor the code getting the latest valid Git tag",
    body: [],
    footer: []
  },
  {
    sha: "bc13eeeb0c0c57212ef7f634ec41f610e29438a2",
    description: "refactor(release): refactor the code getting the latest valid Git tag",
    body: [],
    footer: []
  },
  {
    sha: "2e8e93680920d864c5e53fe4114313104a56ef32",
    description: "test(release): set last release",
    body: [],
    footer: []
  },
  {
    sha: "08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67",
    description: "feat(release): set last release",
    body: [],
    footer: []
  },
  {
    sha: "23c8ae7c866ab138968e26e865bf28388aa893d1",
    description:
      "test(git): remove test checking the return `false` if the package cannot publish from the branch",
    body: ["Another function calling `getAllTags()` checks such a condition from now on."],
    footer: []
  },
  {
    sha: "67a67bf2f614c1e3c5292c780bb4c5c4e91b4c78",
    description: "refactor(git): stop checking if the package can publish from branch",
    body: ["Another function calling `getAllTags()` does such a checking from now on."],
    footer: []
  },
  {
    sha: "60e154c496f20f0d806229893cad54d53c6c8bc8",
    description: "refactor(config): add `version` optional property to type `Package`",
    body: [],
    footer: []
  }
];
