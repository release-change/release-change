import { mockedUriForCommits } from "./mocked-uri.js";

export const mockedFailureFetches = [
  {
    title: "should throw an error in case the request is unauthorised",
    response: {
      status: 401,
      statusText: "Unauthorized"
    },
    expectedError: new Error("Failed to post: Unauthorized", {
      cause: {
        title: "Failed to post",
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
    expectedError: new Error("Failed to post: rate limit exceeded", {
      cause: {
        title: "Failed to post",
        message: "rate limit exceeded",
        details: {
          output: "status: 403"
        }
      }
    })
  },
  {
    title: "should throw an error if the ressource is gone",
    response: {
      status: 410,
      statusText: "Gone"
    },
    expectedError: new Error("Failed to post: Gone", {
      cause: {
        title: "Failed to post",
        message: "Gone",
        details: {
          output: "status: 410"
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
    expectedError: new Error("Failed to post: Unprocessable Entity", {
      cause: {
        title: "Failed to post",
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
    expectedError: new Error("Failed to post: Internal server error", {
      cause: {
        title: "Failed to post",
        message: "Internal server error",
        details: {
          output: "status: 500"
        }
      }
    })
  }
];
export const mockedFailureFetchesForCommits = [
  {
    title: "should throw an error if the URI is not found",
    response: {
      status: 404,
      statusText: "Not Found",
      json: () => Promise.resolve({ message: "Not Found" })
    },
    expectedError: new Error(
      `Failed to get the associated pull requests: Failed to fetch URI ${mockedUriForCommits}.`,
      {
        cause: {
          title: "Failed to get the associated pull requests",
          message: `Failed to fetch URI ${mockedUriForCommits}.`,
          details: {
            output: "status: 404"
          }
        }
      }
    )
  },
  {
    title: "should throw an error in case of conflict",
    response: {
      status: 409,
      statusText: "Conflict detected",
      json: () =>
        Promise.resolve({
          message: "Conflict detected",
          documentation_url:
            "https://docs.github.com/rest/commits/commits#list-pull-requests-associated-with-a-commit"
        })
    },
    expectedError: new Error(
      "Failed to get the associated pull requests: Conflict detected See https://docs.github.com/rest/commits/commits#list-pull-requests-associated-with-a-commit.",
      {
        cause: {
          title: "Failed to get the associated pull requests",
          message:
            "Conflict detected See https://docs.github.com/rest/commits/commits#list-pull-requests-associated-with-a-commit.",
          details: {
            output: "status: 409"
          }
        }
      }
    )
  },
  {
    title: "should throw an error in case of rate limit excess",
    response: {
      status: 403,
      statusText: "Forbidden",
      json: () =>
        Promise.resolve({
          message:
            "API rate limit exceeded for 0.0.0.0. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
          documentation_url:
            "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
        })
    },
    expectedError: new Error(
      "Failed to get the associated pull requests: API rate limit exceeded for 0.0.0.0. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) See https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting.",
      {
        cause: {
          title: "Failed to get the associated pull requests",
          message:
            "API rate limit exceeded for 0.0.0.0. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) See https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting.",
          details: {
            output: "status: 403"
          }
        }
      }
    )
  },
  {
    title: "should throw an error in case of request excess",
    response: {
      status: 429,
      statusText: "Too Many Requests",
      json: () =>
        Promise.resolve({
          message:
            "You have triggered an abuse detection mechanism. Please wait a few minutes before you try again.",
          documentation_url: "https://developer.github.com/v3/#abuse-rate-limits"
        })
    },
    expectedError: new Error(
      "Failed to get the associated pull requests: You have triggered an abuse detection mechanism. Please wait a few minutes before you try again. See https://developer.github.com/v3/#abuse-rate-limits.",
      {
        cause: {
          title: "Failed to get the associated pull requests",
          message:
            "You have triggered an abuse detection mechanism. Please wait a few minutes before you try again. See https://developer.github.com/v3/#abuse-rate-limits.",
          details: {
            output: "status: 429"
          }
        }
      }
    )
  },
  {
    title: "should throw an error in case of other HTTP status code",
    response: {
      status: 500,
      statusText: "Internal server error",
      json: () => Promise.resolve({ message: "Internal server error" })
    },
    expectedError: new Error("Failed to get the associated pull requests: Internal server error", {
      cause: {
        title: "Failed to get the associated pull requests",
        message: "Internal server error",
        details: {
          output: "status: 500"
        }
      }
    })
  }
];
