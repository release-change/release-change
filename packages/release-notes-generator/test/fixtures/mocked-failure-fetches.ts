import { mockedUri } from "./mocked-uri.js";

export const mockedFailureFetches = [
  {
    title: "should throw an error if the URI is not found",
    response: { status: 404 },
    expectedError: new Error(
      `Failed to create the release notes: Failed to fetch URI ${mockedUri}.`,
      {
        cause: {
          title: "Failed to create the release notes",
          message: `Failed to fetch URI ${mockedUri}.`,
          details: {
            output: "status: 404"
          }
        }
      }
    )
  },
  {
    title: "should throw an error in case of unauthorisation",
    response: {
      status: 401,
      statusText: "Unauthorized"
    },
    expectedError: new Error("Failed to create the release notes: Unauthorized", {
      cause: {
        title: "Failed to create the release notes",
        message: "Unauthorized",
        details: {
          output: "status: 401"
        }
      }
    })
  },
  {
    title: "should throw an error in case of rate limit excess",
    response: {
      status: 403,
      statusText: "rate limit exceeded"
    },
    expectedError: new Error("Failed to create the release notes: rate limit exceeded", {
      cause: {
        title: "Failed to create the release notes",
        message: "rate limit exceeded",
        details: {
          output: "status: 403"
        }
      }
    })
  },
  {
    title: "should throw an error in case of validation failure or endpoint spam",
    response: {
      status: 422,
      statusText: "Unprocessable Entity"
    },
    expectedError: new Error("Failed to create the release notes: Unprocessable Entity", {
      cause: {
        title: "Failed to create the release notes",
        message: "Unprocessable Entity",
        details: {
          output: "status: 422"
        }
      }
    })
  },
  {
    title: "should throw an error in case of other HTTP status code",
    response: {
      status: 500,
      statusText: "Internal server error"
    },
    expectedError: new Error("Failed to create the release notes: Internal server error", {
      cause: {
        title: "Failed to create the release notes",
        message: "Internal server error",
        details: {
          output: "status: 500"
        }
      }
    })
  }
];
