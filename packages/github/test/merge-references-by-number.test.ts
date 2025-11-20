import { assert, it } from "vitest";

import { mergeReferencesByNumber } from "../src/merge-references-by-number.js";

const mockedArraysWithObjectsToMerge = [
  {
    input: [
      { number: 8203, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 2000, isPullRequest: true, gitTags: ["v1.2.3"] },
      {
        number: 8203,
        isPullRequest: true,
        gitTags: ["v1.2.3", "@monorepo/a@v1.0.0", "@monorepo/b@v1.1.0", "@monorepo/c@v0.1.0"]
      },
      { number: 772, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 1981, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 1981, isPullRequest: true, gitTags: ["@monorepo/c@v0.1.0"] },
      { number: 1971, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 771, isPullRequest: true, gitTags: ["v1.2.3"] }
    ],
    expected: [
      {
        number: 8203,
        isPullRequest: true,
        gitTags: ["v1.2.3", "@monorepo/a@v1.0.0", "@monorepo/b@v1.1.0", "@monorepo/c@v0.1.0"]
      },
      { number: 2000, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 772, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 1981, isPullRequest: true, gitTags: ["v1.2.3", "@monorepo/c@v0.1.0"] },
      { number: 1971, isPullRequest: true, gitTags: ["v1.2.3"] },
      { number: 771, isPullRequest: true, gitTags: ["v1.2.3"] }
    ]
  },
  {
    input: [
      { number: 8203, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 2000, isPullRequest: false, gitTags: ["v1.2.3"] },
      {
        number: 8203,
        isPullRequest: false,
        gitTags: ["v1.2.3", "@monorepo/a@v1.0.0", "@monorepo/b@v1.1.0", "@monorepo/c@v0.1.0"]
      },
      { number: 772, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 1981, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 1981, isPullRequest: false, gitTags: ["@monorepo/c@v0.1.0"] },
      { number: 1971, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 771, isPullRequest: false, gitTags: ["v1.2.3"] }
    ],
    expected: [
      {
        number: 8203,
        isPullRequest: false,
        gitTags: ["v1.2.3", "@monorepo/a@v1.0.0", "@monorepo/b@v1.1.0", "@monorepo/c@v0.1.0"]
      },
      { number: 2000, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 772, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 1981, isPullRequest: false, gitTags: ["v1.2.3", "@monorepo/c@v0.1.0"] },
      { number: 1971, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 771, isPullRequest: false, gitTags: ["v1.2.3"] }
    ]
  }
];

it.each(mockedArraysWithObjectsToMerge)("should return $expected from $input", ({
  input,
  expected
}) => {
  assert.deepEqual(mergeReferencesByNumber(input), expected);
});
