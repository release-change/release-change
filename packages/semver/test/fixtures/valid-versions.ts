export const validVersions = [
  { raw: "1.0.0", expected: { major: 1, minor: 0, patch: 0, prerelease: [], build: [] } },
  { raw: "2.1.0", expected: { major: 2, minor: 1, patch: 0, prerelease: [], build: [] } },
  { raw: "3.2.1", expected: { major: 3, minor: 2, patch: 1, prerelease: [], build: [] } },
  { raw: "1.2.3-0", expected: { major: 1, minor: 2, patch: 3, prerelease: [0], build: [] } },
  { raw: "1.2.3-123", expected: { major: 1, minor: 2, patch: 3, prerelease: [123], build: [] } },
  {
    raw: "1.2.3-1.2.3",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [1, 2, 3], build: [] }
  },
  { raw: "1.2.3-1a", expected: { major: 1, minor: 2, patch: 3, prerelease: ["1a"], build: [] } },
  { raw: "1.2.3-a1", expected: { major: 1, minor: 2, patch: 3, prerelease: ["a1"], build: [] } },
  {
    raw: "1.2.3-alpha",
    expected: { major: 1, minor: 2, patch: 3, prerelease: ["alpha"], build: [] }
  },
  {
    raw: "1.2.3-alpha.1",
    expected: { major: 1, minor: 2, patch: 3, prerelease: ["alpha", 1], build: [] }
  },
  {
    raw: "1.2.3-alpha-1",
    expected: { major: 1, minor: 2, patch: 3, prerelease: ["alpha-1"], build: [] }
  },
  {
    raw: "1.2.3-alpha-.-beta",
    expected: { major: 1, minor: 2, patch: 3, prerelease: ["alpha-", "-beta"], build: [] }
  },
  { raw: "1.2.3+456", expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["456"] } },
  {
    raw: "1.2.3+build",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build"] }
  },
  {
    raw: "1.2.3+new-build",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["new-build"] }
  },
  {
    raw: "1.2.3+build.1",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build", "1"] }
  },
  {
    raw: "1.2.3+build.1a",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build", "1a"] }
  },
  {
    raw: "1.2.3+build.a1",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build", "a1"] }
  },
  {
    raw: "1.2.3+build.alpha",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build", "alpha"] }
  },
  {
    raw: "1.2.3+build.alpha.beta",
    expected: { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build", "alpha", "beta"] }
  },
  {
    raw: "1.2.3-alpha+build",
    expected: { major: 1, minor: 2, patch: 3, prerelease: ["alpha"], build: ["build"] }
  }
];
