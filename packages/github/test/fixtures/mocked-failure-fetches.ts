import { mockedUriForCommits } from "./mocked-uri.js";

export const mockedFailureFetches = [
  {
    title: "should throw an error in case the request is unauthorised",
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
    title: "should throw an error if the ressource is gone",
    response: {
      status: 410,
      statusText: "Gone",
      expectedError: "Gone"
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
export const mockedFailureFetchesForCommits = [
  {
    title: "should throw an error if the URI is not found",
    response: { status: 404 },
    expectedError: `Failed to fetch URI ${mockedUriForCommits}.`
  },
  {
    title: "should throw an error in case of conflict",
    response: {
      status: 409,
      json: () =>
        Promise.resolve({
          message: "Conflict detected",
          documentation_url:
            "https://docs.github.com/rest/commits/commits#list-pull-requests-associated-with-a-commit"
        }),
      expectedError: `There is a conflict with the requested URI ${mockedUriForCommits}. See https://docs.github.com/rest/commits/commits#list-pull-requests-associated-with-a-commit.`
    }
  },
  {
    title: "should throw an error in case of rate limit excess",
    response: {
      status: 403,
      json: () =>
        Promise.resolve({
          message:
            "API rate limit exceeded for 0.0.0.0. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
          documentation_url:
            "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
        })
    },
    expectedError:
      "API rate limit exceeded for 0.0.0.0. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.) See https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting."
  },
  {
    title: "should throw an error in case of request excess",
    response: {
      status: 429,
      json: () =>
        Promise.resolve({
          message:
            "You have triggered an abuse detection mechanism. Please wait a few minutes before you try again.",
          documentation_url: "https://developer.github.com/v3/#abuse-rate-limits"
        })
    },
    expectedError:
      "You have triggered an abuse detection mechanism. Please wait a few minutes before you try again. See https://developer.github.com/v3/#abuse-rate-limits."
  },
  {
    title: "should throw an error in case of other HTTP status code",
    response: {
      status: 500,
      json: () => Promise.resolve({ message: "Internal server error" })
    },
    expectedError: "Internal server error"
  }
];
