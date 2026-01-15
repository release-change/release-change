export const mockedRepo = [
  {
    title: "should return `false` if auto-merge is not allowed",
    response: {
      status: 200,
      statusText: "OK",
      json: () => Promise.resolve({ allow_auto_merge: false })
    },
    expected: false
  },
  {
    title: "should return `true` if auto-merge is not allowed",
    response: {
      status: 200,
      statusText: "OK",
      json: () => Promise.resolve({ allow_auto_merge: true })
    },
    expected: true
  }
];
