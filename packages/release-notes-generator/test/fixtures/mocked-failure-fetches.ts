import { mockedUri } from "./mocked-uri.js";

export const mockedFailureFetches = [
  {
    title: "should throw an error if the URI is not found",
    response: { status: 404 },
    expectedError: `Failed to fetch URI ${mockedUri}.`
  },
  {
    title: "should throw an error in case of unauthorisation",
    response: {
      status: 401,
      statusText: "Unauthorized",
      expectedError: "Unauthorized"
    }
  },
  {
    title: "should throw an error in case of rate limit excess",
    response: {
      status: 403,
      statusText: "rate limit exceeded",
      expectedError: "rate limit exceeded"
    }
  },
  {
    title: "should throw an error in case of validation failure or endpoint spam",
    response: {
      status: 422,
      statusText: "Unprocessable Entity",
      expectedError: "Unprocessable Entity"
    }
  },
  {
    title: "should throw an error in case of other HTTP status code",
    response: {
      status: 500,
      statusText: "Internal server error"
    },
    expectedError: "Internal server error"
  }
];
