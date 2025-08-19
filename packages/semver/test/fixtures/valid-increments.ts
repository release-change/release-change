import type {
  SemverData,
  SemverIdentifierBase,
  SemverReleaseType
} from "../../src/semver.types.js";

export const validIncrements: {
  version: string;
  releaseType: SemverReleaseType;
  expected: SemverData;
  prefix?: string;
  identifierBase?: SemverIdentifierBase;
}[] = [
  {
    version: "1.2.3",
    releaseType: "major",
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
    version: "1.2.3",
    releaseType: "minor",
    expected: {
      raw: "1.3.0",
      version: "1.3.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    version: "1.2.3",
    releaseType: "patch",
    expected: {
      raw: "1.2.4",
      version: "1.2.4",
      major: 1,
      minor: 2,
      patch: 4,
      prerelease: [],
      build: []
    }
  },
  {
    version: "1.2.3-tag",
    releaseType: "major",
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
    version: "1.2.0-0",
    releaseType: "patch",
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
    version: "1.2.3-4",
    releaseType: "major",
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
    version: "1.2.3-4",
    releaseType: "minor",
    expected: {
      raw: "1.3.0",
      version: "1.3.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    version: "1.2.3-4",
    releaseType: "patch",
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
    version: "1.2.3-alpha.0.beta",
    releaseType: "major",
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
    version: "1.2.3-alpha.0.beta",
    releaseType: "minor",
    expected: {
      raw: "1.3.0",
      version: "1.3.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "patch",
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
    version: "1.2.4",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.5-0",
      version: "1.2.5-0",
      major: 1,
      minor: 2,
      patch: 5,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.3-0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-1",
      version: "1.2.3-1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [1],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.1",
      version: "1.2.3-alpha.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 1],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.2",
      version: "1.2.3-alpha.2",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 2],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.2",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.3",
      version: "1.2.3-alpha.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 3],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.1.beta",
      version: "1.2.3-alpha.1.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 1, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.1.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.2.beta",
      version: "1.2.3-alpha.2.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 2, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.2.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.3.beta",
      version: "1.2.3-alpha.3.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 3, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.0.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.1.beta",
      version: "1.2.3-alpha.10.1.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, 1, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.1.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.2.beta",
      version: "1.2.3-alpha.10.2.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, 2, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.2.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.3.beta",
      version: "1.2.3-alpha.10.3.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, 3, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.beta.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta.1",
      version: "1.2.3-alpha.10.beta.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta", 1],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.beta.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta.2",
      version: "1.2.3-alpha.10.beta.2",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta", 2],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.beta.2",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta.3",
      version: "1.2.3-alpha.10.beta.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta", 3],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.9.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta",
      version: "1.2.3-alpha.10.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.10.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.11.beta",
      version: "1.2.3-alpha.11.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 11, "beta"],
      build: []
    }
  },
  {
    version: "1.2.3-alpha.11.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.12.beta",
      version: "1.2.3-alpha.12.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 12, "beta"],
      build: []
    }
  },
  {
    version: "1.0.0",
    releaseType: "prepatch",
    expected: {
      raw: "1.0.1-alpha.1.1a.0",
      version: "1.0.1-alpha.1.1a.0",
      major: 1,
      minor: 0,
      patch: 1,
      prerelease: ["alpha", 1, "1a", 0],
      build: []
    },
    prefix: "alpha.1.1a"
  },
  {
    version: "1.2.0",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-0",
      version: "1.2.1-0",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.0-1",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-0",
      version: "1.2.1-0",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.0",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-0",
      version: "1.3.0-0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.3-1",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-0",
      version: "1.3.0-0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.0",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-0",
      version: "2.0.0-0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.3-1",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-0",
      version: "2.0.0-0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [0],
      build: []
    }
  },
  {
    version: "1.2.0-1",
    releaseType: "minor",
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
    version: "1.0.0-1",
    releaseType: "major",
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
    version: "1.0.0-1",
    releaseType: "release",
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
    version: "1.2.0-1",
    releaseType: "release",
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
    version: "1.2.3-1",
    releaseType: "release",
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
    version: "1.2.3",
    releaseType: "major",
    expected: {
      raw: "2.0.0",
      version: "2.0.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3",
    releaseType: "minor",
    expected: {
      raw: "1.3.0",
      version: "1.3.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3",
    releaseType: "patch",
    expected: {
      raw: "1.2.4",
      version: "1.2.4",
      major: 1,
      minor: 2,
      patch: 4,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-tag",
    releaseType: "major",
    expected: {
      raw: "2.0.0",
      version: "2.0.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.0-0",
    releaseType: "patch",
    expected: {
      raw: "1.2.0",
      version: "1.2.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-4",
    releaseType: "major",
    expected: {
      raw: "2.0.0",
      version: "2.0.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-4",
    releaseType: "minor",
    expected: {
      raw: "1.3.0",
      version: "1.3.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-4",
    releaseType: "patch",
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "major",
    expected: {
      raw: "2.0.0",
      version: "2.0.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "minor",
    expected: {
      raw: "1.3.0",
      version: "1.3.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "patch",
    expected: {
      raw: "1.2.3",
      version: "1.2.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.4",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.5-dev.0",
      version: "1.2.5-dev.0",
      major: 1,
      minor: 2,
      patch: 5,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.1",
      version: "1.2.3-alpha.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 1],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.0.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.1.beta",
      version: "1.2.3-alpha.1.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 1, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.0.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.10.0.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.1.beta",
      version: "1.2.3-alpha.10.1.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, 1, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.1.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.2.beta",
      version: "1.2.3-alpha.10.2.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, 2, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.2.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.3.beta",
      version: "1.2.3-alpha.10.3.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, 3, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.beta.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.10.beta.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta.1",
      version: "1.2.3-alpha.10.beta.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta", 1],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.beta.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta.2",
      version: "1.2.3-alpha.10.beta.2",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta", 2],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.beta.2",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta.3",
      version: "1.2.3-alpha.10.beta.3",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta", 3],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.9.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-alpha.9.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.10.beta",
      version: "1.2.3-alpha.10.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 10, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.10.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.11.beta",
      version: "1.2.3-alpha.11.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 11, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.3-alpha.11.beta",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.12.beta",
      version: "1.2.3-alpha.12.beta",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 12, "beta"],
      build: []
    },
    prefix: "alpha"
  },
  {
    version: "1.2.0",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev.0",
      version: "1.2.1-dev.0",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.0-1",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev.0",
      version: "1.2.1-dev.0",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.0",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-dev.0",
      version: "1.3.0-dev.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-1",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-dev.0",
      version: "1.3.0-dev.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.0",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev.0",
      version: "2.0.0-dev.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-1",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev.0",
      version: "2.0.0-dev.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-1",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev.1",
      version: "2.0.0-dev.1",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev", 1],
      build: []
    },
    prefix: "dev",
    identifierBase: 1
  },
  {
    version: "1.2.0-1",
    releaseType: "minor",
    expected: {
      raw: "1.2.0",
      version: "1.2.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.0.0-1",
    releaseType: "major",
    expected: {
      raw: "1.0.0",
      version: "1.0.0",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.3-0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-1.0",
      version: "1.2.3-1.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [1, 0],
      build: []
    },
    prefix: "1"
  },
  {
    version: "1.2.3-1.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-1.1",
      version: "1.2.3-1.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [1, 1],
      build: []
    },
    prefix: "1"
  },
  {
    version: "1.2.3-1.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-1.2",
      version: "1.2.3-1.2",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [1, 2],
      build: []
    },
    prefix: "1"
  },
  {
    version: "1.2.3-1.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-2.0",
      version: "1.2.3-2.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [2, 0],
      build: []
    },
    prefix: "2"
  },
  {
    version: "1.2.0-1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.0-alpha.0",
      version: "1.2.0-alpha.0",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: ["alpha", 0],
      build: []
    },
    prefix: "alpha",
    identifierBase: "0"
  },
  {
    version: "1.2.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.2-alpha.0",
      version: "1.2.2-alpha.0",
      major: 1,
      minor: 2,
      patch: 2,
      prerelease: ["alpha", 0],
      build: []
    },
    prefix: "alpha",
    identifierBase: "0"
  },
  {
    version: "0.2.0",
    releaseType: "prerelease",
    expected: {
      raw: "0.2.1-alpha.0",
      version: "0.2.1-alpha.0",
      major: 0,
      minor: 2,
      patch: 1,
      prerelease: ["alpha", 0],
      build: []
    },
    prefix: "alpha",
    identifierBase: "0"
  },
  {
    version: "1.2.2",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha.1",
      version: "1.2.3-alpha.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha", 1],
      build: []
    },
    prefix: "alpha",
    identifierBase: "1"
  },
  {
    version: "1.2.3",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.4-alpha.1",
      version: "1.2.4-alpha.1",
      major: 1,
      minor: 2,
      patch: 4,
      prerelease: ["alpha", 1],
      build: []
    },
    prefix: "alpha",
    identifierBase: "1"
  },
  {
    version: "1.2.4",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.5-alpha.1",
      version: "1.2.5-alpha.1",
      major: 1,
      minor: 2,
      patch: 5,
      prerelease: ["alpha", 1],
      build: []
    },
    prefix: "alpha",
    identifierBase: "1"
  },
  {
    version: "1.2.0",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev.1",
      version: "1.2.1-dev.1",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev", 1],
      build: []
    },
    prefix: "dev",
    identifierBase: "1"
  },
  {
    version: "1.2.0-1",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev.1",
      version: "1.2.1-dev.1",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev", 1],
      build: []
    },
    prefix: "dev",
    identifierBase: "1"
  },
  {
    version: "1.2.0",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev.0",
      version: "2.0.0-dev.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev",
    identifierBase: "0"
  },
  {
    version: "1.2.3-1",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev.0",
      version: "2.0.0-dev.0",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev",
    identifierBase: "0"
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.0",
      version: "1.2.3-dev.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev",
    identifierBase: "0"
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.1",
      version: "1.2.3-dev.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", 1],
      build: []
    },
    prefix: "dev",
    identifierBase: "1"
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.bar.0",
      version: "1.2.3-dev.bar.0",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", "bar", 0],
      build: []
    },
    prefix: "",
    identifierBase: "0"
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.bar.1",
      version: "1.2.3-dev.bar.1",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", "bar", 1],
      build: []
    },
    prefix: "",
    identifierBase: "1"
  },
  {
    version: "1.2.0",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-dev.1",
      version: "1.3.0-dev.1",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["dev", 1],
      build: []
    },
    prefix: "dev",
    identifierBase: "1"
  },
  {
    version: "1.2.3-1",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-dev.0",
      version: "1.3.0-dev.0",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["dev", 0],
      build: []
    },
    prefix: "dev"
  },
  {
    version: "1.2.0",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.1-1",
      version: "1.2.1-1",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: [1],
      build: []
    },
    prefix: "",
    identifierBase: "1"
  },
  {
    version: "1.2.0-1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.0-alpha",
      version: "1.2.0-alpha",
      major: 1,
      minor: 2,
      patch: 0,
      prerelease: ["alpha"],
      build: []
    },
    prefix: "alpha",
    identifierBase: false
  },
  {
    version: "1.2.1",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.2-alpha",
      version: "1.2.2-alpha",
      major: 1,
      minor: 2,
      patch: 2,
      prerelease: ["alpha"],
      build: []
    },
    prefix: "alpha",
    identifierBase: false
  },
  {
    version: "1.2.2",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-alpha",
      version: "1.2.3-alpha",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["alpha"],
      build: []
    },
    prefix: "alpha",
    identifierBase: false
  },
  {
    version: "1.2.0",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev",
      version: "1.2.1-dev",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.0-1",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev",
      version: "1.2.1-dev",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.0",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev",
      version: "2.0.0-dev",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.3-1",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev",
      version: "2.0.0-dev",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev",
      version: "1.2.3-dev",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.3-dev.bar",
    releaseType: "prerelease",
    expected: {
      raw: "1.2.3-dev.baz",
      version: "1.2.3-dev.baz",
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ["dev", "baz"],
      build: []
    },
    prefix: "dev.baz",
    identifierBase: false
  },
  {
    version: "1.2.0",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-dev",
      version: "1.3.0-dev",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.3-1",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-dev",
      version: "1.3.0-dev",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.0-dev",
    releaseType: "premajor",
    expected: {
      raw: "2.0.0-dev",
      version: "2.0.0-dev",
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.2.0-dev",
    releaseType: "preminor",
    expected: {
      raw: "1.3.0-beta",
      version: "1.3.0-beta",
      major: 1,
      minor: 3,
      patch: 0,
      prerelease: ["beta"],
      build: []
    },
    prefix: "beta",
    identifierBase: false
  },
  {
    version: "1.2.0-dev",
    releaseType: "prepatch",
    expected: {
      raw: "1.2.1-dev",
      version: "1.2.1-dev",
      major: 1,
      minor: 2,
      patch: 1,
      prerelease: ["dev"],
      build: []
    },
    prefix: "dev",
    identifierBase: false
  },
  {
    version: "1.0.0-rc.1+build.4",
    releaseType: "prerelease",
    expected: {
      raw: "1.0.0-rc.2+build.4",
      version: "1.0.0-rc.2",
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["rc", 2],
      build: ["build", "4"]
    },
    prefix: "rc",
    identifierBase: false
  }
];
