export const validVersionsInLooseMode = [
  {
    raw: "v1.2.3",
    version: "1.2.3",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: [] }
  },
  {
    raw: "=1.2.3",
    version: "1.2.3",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: [] }
  }
];
