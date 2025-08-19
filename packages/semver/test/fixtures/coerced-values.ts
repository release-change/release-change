import { Semver } from "../../src/index.js";

export const coercedValues = [
  {
    value: new Semver("1.2.3"),
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: 10,
    expected: {
      raw: "10.0.0",
      version: "10.0.0",
      major: 10,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: 10.5,
    expected: {
      raw: "10.5.0",
      version: "10.5.0",
      major: 10,
      minor: 5,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: ".1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: ".1.",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "..1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: ".1.1",
    expected: {
      raw: "1.1.0",
      version: "1.1.0",
      major: 1,
      minor: 1,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.0",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.0.0",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "0",
    expected: {
      raw: "0.0.0",
      version: "0.0.0",
      major: 0,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "0.0",
    expected: {
      raw: "0.0.0",
      version: "0.0.0",
      major: 0,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "0.0.0",
    expected: {
      raw: "0.0.0",
      version: "0.0.0",
      major: 0,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "0.1",
    expected: {
      raw: "0.1.0",
      version: "0.1.0",
      major: 0,
      minor: 1,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "0.0.1",
    expected: {
      raw: "0.0.1",
      version: "0.0.1",
      major: 0,
      minor: 0,
      patch: 1,
      prerelease: [],
      build: []
    }
  },
  {
    value: "0.1.1",
    expected: {
      raw: "0.1.1",
      version: "0.1.1",
      major: 0,
      minor: 1,
      patch: 1,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.2",
    expected: {
      raw: "1.2.0",
      version: "1.2.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.2.3",
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.2.3.4",
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: "13",
    expected: {
      raw: "13.0.0",
      version: "13.0.0",
      major: 13,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "35.12",
    expected: {
      raw: "35.12.0",
      version: "35.12.0",
      major: 35,
      minor: 12,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "35.12.18",
    expected: {
      raw: "35.12.18",
      version: "35.12.18",
      major: 35,
      minor: 12,
      patch: 18,
      prerelease: [],
      build: []
    }
  },
  {
    value: "35.12.18.24",
    expected: {
      raw: "35.12.18",
      version: "35.12.18",
      major: 35,
      minor: 12,
      patch: 18,
      prerelease: [],
      build: []
    }
  },
  {
    value: "v1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "v1.2",
    expected: {
      raw: "1.2.0",
      version: "1.2.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "v1.2.3",
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: "v1.2.3.4",
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: " 1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1 ",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1 0",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1 1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.1 1",
    expected: {
      raw: "1.1.0",
      version: "1.1.0",
      major: 1,
      minor: 1,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.1-1",
    expected: {
      raw: "1.1.0",
      version: "1.1.0",
      major: 1,
      minor: 1,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.1-1",
    expected: {
      raw: "1.1.0",
      version: "1.1.0",
      major: 1,
      minor: 1,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "a1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "a1a",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1a",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "version 1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "version1",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "version1.0",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "version1.1",
    expected: {
      raw: "1.1.0",
      version: "1.1.0",
      major: 1,
      minor: 1,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "42.6.7.9.3-alpha",
    expected: {
      raw: "42.6.7",
      version: "42.6.7",
      major: 42,
      minor: 6,
      patch: 7,
      prerelease: [],
      build: []
    }
  },
  {
    value: "v2",
    expected: {
      raw: "2.0.0",
      version: "2.0.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "v3.4 replaces v3.3.1",
    expected: {
      raw: "3.4.0",
      version: "3.4.0",
      major: 3,
      minor: 4,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: "4.6.3.9.2-alpha2",
    expected: {
      raw: "4.6.3",
      version: "4.6.3",
      major: 4,
      minor: 6,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(17)}.2`,
    expected: {
      raw: "2.0.0",
      version: "2.0.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(17)}.2.3`,
    expected: {
      raw: "2.3.0",
      version: "2.3.0",
      major: 2,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.${"2".repeat(17)}.3`,
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.2.${"3".repeat(17)}`,
    expected: {
      raw: "1.2.0",
      version: "1.2.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(17)}.2.3.4`,
    expected: {
      raw: "2.3.4",
      version: "2.3.4",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.${"2".repeat(17)}.3.4`,
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.2.${"3".repeat(17)}.4`,
    expected: {
      raw: "1.2.0",
      version: "1.2.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(17)}.${"2".repeat(16)}.${"3".repeat(16)}`,
    expected: {
      raw: `${"2".repeat(16)}.${"3".repeat(16)}.0`,
      version: `${"2".repeat(16)}.${"3".repeat(16)}.0`,
      major: Number("2".repeat(16)),
      minor: Number("3".repeat(16)),
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(16)}.${"2".repeat(17)}.${"3".repeat(16)}`,
    expected: {
      raw: `${"1".repeat(16)}.0.0`,
      version: `${"1".repeat(16)}.0.0`,
      major: Number("1".repeat(16)),
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(16)}.${"2".repeat(16)}.${"3".repeat(17)}`,
    expected: {
      raw: `${"1".repeat(16)}.${"2".repeat(16)}.0`,
      version: `${"1".repeat(16)}.${"2".repeat(16)}.0`,
      major: Number("1".repeat(16)),
      minor: Number("2".repeat(16)),
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `11${".1".repeat(126)}`,
    expected: {
      raw: "11.1.1",
      version: "11.1.1",
      major: 11,
      minor: 1,
      patch: 1,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1".repeat(16),
    expected: {
      raw: `${"1".repeat(16)}.0.0`,
      version: `${"1".repeat(16)}.0.0`,
      major: Number("1".repeat(16)),
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `a${"1".repeat(16)}`,
    expected: {
      raw: `${"1".repeat(16)}.0.0`,
      version: `${"1".repeat(16)}.0.0`,
      major: Number("1".repeat(16)),
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(16)}.2.3.4`,
    expected: {
      raw: `${"1".repeat(16)}.2.3`,
      version: `${"1".repeat(16)}.2.3`,
      major: Number("1".repeat(16)),
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.${"2".repeat(16)}.3.4`,
    expected: {
      raw: `1.${"2".repeat(16)}.3`,
      version: `1.${"2".repeat(16)}.3`,
      major: 1,
      minor: Number("2".repeat(16)),
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.2.${"3".repeat(16)}.4`,
    expected: {
      raw: `1.2.${"3".repeat(16)}`,
      version: `1.2.${"3".repeat(16)}`,
      major: 1,
      minor: 2,
      patch: Number("3".repeat(16)),
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(16)}.${"2".repeat(16)}.${"3".repeat(16)}`,
    expected: {
      raw: `${"1".repeat(16)}.${"2".repeat(16)}.${"3".repeat(16)}`,
      version: `${"1".repeat(16)}.${"2".repeat(16)}.${"3".repeat(16)}`,
      major: Number("1".repeat(16)),
      minor: Number("2".repeat(16)),
      patch: Number("3".repeat(16)),
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.2.3.${"4".repeat(252)}.5`,
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: `1.2.3.${"4".repeat(1024)}`,
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    }
  },
  {
    value: `${"1".repeat(17)}.4.7.4`,
    expected: {
      raw: "4.7.4",
      version: "4.7.4",
      major: 4,
      minor: 7,
      patch: 4,
      prerelease: [],
      build: []
    }
  },
  {
    value: "1.2.3/a/b/c/2.3.4",
    expected: {
      raw: "2.3.4",
      version: "2.3.4",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3.4.5.6",
    expected: {
      raw: "4.5.6",
      version: "4.5.6",
      major: 4,
      minor: 5,
      patch: 6,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3.4.5/6",
    expected: {
      raw: "6.0.0",
      version: "6.0.0",
      major: 6,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3.4./6",
    expected: {
      raw: "6.0.0",
      version: "6.0.0",
      major: 6,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3.4/6",
    expected: {
      raw: "6.0.0",
      version: "6.0.0",
      major: 6,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3./6",
    expected: {
      raw: "6.0.0",
      version: "6.0.0",
      major: 6,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3/6",
    expected: {
      raw: "6.0.0",
      version: "6.0.0",
      major: 6,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3.4",
    expected: {
      raw: "2.3.4",
      version: "2.3.4",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1.2.3.4xyz",
    expected: {
      raw: "2.3.4",
      version: "2.3.4",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: [],
      build: []
    },
    options: { rtl: true }
  },
  {
    value: "1-rc.5",
    expected: {
      raw: "1.0.0-rc.5",
      version: "1.0.0-rc.5",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["rc", 5],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2-rc.5",
    expected: {
      raw: "1.2.0-rc.5",
      version: "1.2.0-rc.5",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: ["rc", 5],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3-rc.5",
    expected: {
      raw: "1.2.3-rc.5",
      version: "1.2.3-rc.5",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["rc", 5],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3-rc.5/a",
    expected: {
      raw: "1.2.3-rc.5",
      version: "1.2.3-rc.5",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["rc", 5],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3.4-rc.5",
    expected: {
      raw: "1.2.3-rc.5",
      version: "1.2.3-rc.5",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["rc", 5],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3.4+rev.6",
    expected: {
      raw: "1.2.3+rev.6",
      version: "1.2.3+rev.6",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.0.0-1a",
    expected: {
      raw: "1.0.0-1a",
      version: "1.0.0-1a",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["1a"],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.0.0-alpha.12ab",
    expected: {
      raw: "1.0.0-alpha.12ab",
      version: "1.0.0-alpha.12ab",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["alpha", "12ab"],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.0.0-alpha.1234.23cd",
    expected: {
      raw: "1.0.0-alpha.1234.23cd",
      version: "1.0.0-alpha.1234.23cd",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["alpha", 1234, "23cd"],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.0.0-nightly.abc123",
    expected: {
      raw: "1.0.0-nightly.abc123",
      version: "1.0.0-nightly.abc123",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["nightly", "abc123"],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.0.0-nightly.abcdef",
    expected: {
      raw: "1.0.0-nightly.abcdef",
      version: "1.0.0-nightly.abcdef",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["nightly", "abcdef"],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.0.0-nightly.123456",
    expected: {
      raw: "1.0.0-nightly.123456",
      version: "1.0.0-nightly.123456",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["nightly", 123456],
      build: []
    },
    options: { includePrerelease: true }
  },
  {
    value: "1+rev.6",
    expected: {
      raw: "1.0.0+rev.6",
      version: "1.0.0+rev.6",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2+rev.6",
    expected: {
      raw: "1.2.0+rev.6",
      version: "1.2.0+rev.6",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3+rev.6",
    expected: {
      raw: "1.2.3+rev.6",
      version: "1.2.3+rev.6",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3+rev.6/a",
    expected: {
      raw: "1.2.3+rev.6",
      version: "1.2.3+rev.6",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1-rc.5+rev.6",
    expected: {
      raw: "1.0.0-rc.5+rev.6",
      version: "1.0.0-rc.5+rev.6",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2-rc.5+rev.6",
    expected: {
      raw: "1.2.0-rc.5+rev.6",
      version: "1.2.0-rc.5+rev.6",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3-rc.5+rev.6",
    expected: {
      raw: "1.2.3-rc.5+rev.6",
      version: "1.2.3-rc.5+rev.6",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2.3-rc.5+rev.6/a",
    expected: {
      raw: "1.2.3-rc.5+rev.6",
      version: "1.2.3-rc.5+rev.6",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { includePrerelease: true }
  },
  {
    value: "1.2-rc.5+rev.6",
    expected: {
      raw: "1.2.0-rc.5+rev.6",
      version: "1.2.0-rc.5+rev.6",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3-rc.5+rev.6",
    expected: {
      raw: "1.2.3-rc.5+rev.6",
      version: "1.2.3-rc.5+rev.6",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3.4-rc.5+rev.6",
    expected: {
      raw: "2.3.4-rc.5+rev.6",
      version: "2.3.4-rc.5+rev.6",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3.4-rc.5",
    expected: {
      raw: "2.3.4-rc.5",
      version: "2.3.4-rc.5",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: ["rc", 5],
      build: []
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3.4+rev.6",
    expected: {
      raw: "2.3.4+rev.6",
      version: "2.3.4+rev.6",
      major: 2,
      minor: 3,
      patch: 4,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3.4-rc.5+rev.6/7",
    expected: {
      raw: "7.0.0",
      version: "7.0.0",
      major: 7,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3.4-rc/7.5+rev.6",
    expected: {
      raw: "7.5.0+rev.6",
      version: "7.5.0+rev.6",
      major: 7,
      minor: 5,
      patch: 0,
      prerelease: [],
      build: ["rev", "6"]
    },
    options: { rtl: true, includePrerelease: true }
  },
  {
    value: "1.2.3.4/7-rc.5+rev.6",
    expected: {
      raw: "7.0.0-rc.5+rev.6",
      version: "7.0.0-rc.5+rev.6",
      major: 7,
      minor: 0,
      patch: 0,
      prerelease: ["rc", 5],
      build: ["rev", "6"]
    },
    options: { rtl: true, includePrerelease: true }
  }
];
