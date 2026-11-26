export const mockedUsers = [
  {
    user: {
      login: "release-change[bot]",
      id: 123456
    },
    expectedCommitterName: "release-change[bot]",
    expectedCommitterEmail: "123456+release-change[bot]@users.noreply.github.com"
  },
  {
    user: {
      login: "github-actions[bot]",
      id: 1
    },
    expectedCommitterName: "github-actions[bot]",
    expectedCommitterEmail: "1+github-actions[bot]@users.noreply.github.com"
  },
  {
    user: {
      login: "another-bot[bot]",
      id: 456123
    },
    expectedCommitterName: "another-bot[bot]",
    expectedCommitterEmail: "456123+another-bot[bot]@users.noreply.github.com"
  },
  {
    user: {
      login: "another-user",
      id: 123456789
    },
    expectedCommitterName: "another-user",
    expectedCommitterEmail: "123456789+another-user@users.noreply.github.com"
  }
];
