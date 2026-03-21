import { expect, it } from "vitest";

import { formatOutputFromCommandResult } from "../src/index.js";

const mockedStatus = 1;
const mockedStdout = "Some standard output";
const mockedStderr = "Some error output";
const mockedResults = [
  {
    result: {
      status: null,
      stdout: "",
      stderr: ""
    },
    expected: `status: 0

stdout: 

stderr: `
  },
  {
    result: {
      status: null,
      stdout: "",
      stderr: mockedStderr
    },
    expected: `status: 0

stdout: 

stderr: ${mockedStderr}`
  },
  {
    result: {
      status: null,
      stdout: mockedStdout,
      stderr: ""
    },
    expected: `status: 0

stdout: ${mockedStdout}

stderr: `
  },
  {
    result: {
      status: null,
      stdout: mockedStdout,
      stderr: mockedStderr
    },
    expected: `status: 0

stdout: ${mockedStdout}

stderr: ${mockedStderr}`
  },
  {
    result: {
      status: mockedStatus,
      stdout: "",
      stderr: ""
    },
    expected: `status: ${mockedStatus}

stdout: 

stderr: `
  },
  {
    result: {
      status: mockedStatus,
      stdout: "",
      stderr: mockedStderr
    },
    expected: `status: ${mockedStatus}

stdout: 

stderr: ${mockedStderr}`
  },
  {
    result: {
      status: mockedStatus,
      stdout: mockedStdout,
      stderr: ""
    },
    expected: `status: ${mockedStatus}

stdout: ${mockedStdout}

stderr: `
  },
  {
    result: {
      status: mockedStatus,
      stdout: mockedStdout,
      stderr: mockedStderr
    },
    expected: `status: ${mockedStatus}

stdout: ${mockedStdout}

stderr: ${mockedStderr}`
  }
];

it.each(mockedResults)("should return $expected", ({ result, expected }) => {
  expect(formatOutputFromCommandResult(result)).toEqual(expected);
});
