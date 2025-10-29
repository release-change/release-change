import type { DetailedError, Reference } from "@release-change/shared";

export const mockedFailComments: {
  type: "issue" | "pull request";
  isMonorepo: boolean;
  reference: Reference;
  errors: DetailedError[];
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
    errors: [
      {
        title: "Some error",
        message: "The error explained.",
        details: { output: "output: null" }
      },
      {
        title: "Another error",
        message: "The error explained.",
        details: { output: "Error output", command: "git --version" }
      },
      {
        title: "Yet another error",
        message: "",
        details: { output: "" }
      }
    ],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

##### Some error

The error explained.

\`\`\`
output: null
\`\`\`

---

##### Another error

The error explained.

Concerned command: \`git --version\`

\`\`\`
Error output
\`\`\`

---

##### Yet another error

This error does not have any additional information.

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
    errors: [
      {
        title: "Some error",
        message: "The error explained.",
        details: { output: "output: null" }
      },
      {
        title: "Another error",
        message: "The error explained.",
        details: { output: "Error output", command: "git --version" }
      },
      {
        title: "Yet another error",
        message: "",
        details: { output: "" }
      }
    ],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

##### Some error

The error explained.

\`\`\`
output: null
\`\`\`

---

##### Another error

The error explained.

Concerned command: \`git --version\`

\`\`\`
Error output
\`\`\`

---

##### Yet another error

This error does not have any additional information.

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
    errors: [
      {
        title: "Some error",
        message: "The error explained.",
        details: { output: "output: null" }
      },
      {
        title: "Another error",
        message: "The error explained.",
        details: { output: "Error output", command: "git --version" }
      },
      {
        title: "Yet another error",
        message: "",
        details: { output: "" }
      }
    ],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

##### Some error

The error explained.

\`\`\`
output: null
\`\`\`

---

##### Another error

The error explained.

Concerned command: \`git --version\`

\`\`\`
Error output
\`\`\`

---

##### Yet another error

This error does not have any additional information.

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
    errors: [
      {
        title: "Some error",
        message: "The error explained.",
        details: { output: "output: null" }
      },
      {
        title: "Another error",
        message: "The error explained.",
        details: { output: "Error output", command: "git --version" }
      },
      {
        title: "Yet another error",
        message: "",
        details: { output: "" }
      }
    ],
    expectedBody: `#### The release failed

The release from the \`main\` branch failed.

Below are the errors thrown when running the CLI.

---

##### Some error

The error explained.

\`\`\`
output: null
\`\`\`

---

##### Another error

The error explained.

Concerned command: \`git --version\`

\`\`\`
Error output
\`\`\`

---

##### Yet another error

This error does not have any additional information.

---`
  }
];
