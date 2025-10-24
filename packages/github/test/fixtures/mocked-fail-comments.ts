import type { Reference } from "@release-change/shared";

export const mockedFailComments: {
  type: "issue" | "pull request";
  isMonorepo: boolean;
  reference: Reference;
  errors: unknown[];
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
    errors: [],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

No errors reported.

---`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    errors: [],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

No errors reported.

---`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    errors: [],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

No errors reported.

---`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    errors: [],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

No errors reported.

---`
  },
  {
    type: "issue",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    errors: [new Error("Some error"), new Error("Another error")],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

- Some error
- Another error

---`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    errors: [new Error("Some error"), new Error("Another error")],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

- Some error
- Another error

---`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    errors: [new Error("Some error"), new Error("Another error")],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

- Some error
- Another error

---`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    errors: [new Error("Some error"), new Error("Another error")],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

- Some error
- Another error

---`
  }
];
