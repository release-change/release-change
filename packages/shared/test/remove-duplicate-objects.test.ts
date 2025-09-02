import { assert, it } from "vitest";

import { removeDuplicateObjects } from "../src/index.js";

const mockedArraysWithDuplicates = [
  {
    input: [
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 2,
        isPullRequest: false
      }
    ],
    expected: [
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 2,
        isPullRequest: false
      }
    ]
  },
  {
    input: [
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 2,
        isPullRequest: false
      },
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 123,
        isPullRequest: false
      }
    ],
    expected: [
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 2,
        isPullRequest: false
      },
      {
        number: 123,
        isPullRequest: false
      }
    ]
  },
  {
    input: [
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 1,
        isPullRequest: false
      }
    ],
    expected: [
      {
        number: 1,
        isPullRequest: true
      },
      {
        number: 1,
        isPullRequest: false
      }
    ]
  }
];

it.each(mockedArraysWithDuplicates)(
  "should return $expected from $input",
  ({ input, expected }) => {
    assert.deepEqual(removeDuplicateObjects(input), expected);
  }
);
