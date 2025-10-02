import type { Reference } from "@release-change/shared";

export const mockedFailComments: {
  type: "issue" | "pull request";
  isMonorepo: boolean;
  reference: Reference;
  expectedBody: string;
}[] = [
  {
    type: "issue",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.`
  }
];
