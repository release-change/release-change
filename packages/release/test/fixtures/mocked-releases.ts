export const mockedReleases: {
  currentVersion: string;
  branches: {
    branch: string;
    releaseTypes: {
      releaseType: "major" | "minor" | "patch";
      expectedVersion: string;
    }[];
  }[];
}[] = [
  {
    currentVersion: "0.0.0",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0" },
          { releaseType: "minor", expectedVersion: "0.1.0" },
          { releaseType: "patch", expectedVersion: "0.0.1" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "0.1.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "0.0.1-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-beta.1" },
          { releaseType: "minor", expectedVersion: "0.1.0-beta.1" },
          { releaseType: "patch", expectedVersion: "0.0.1-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-rc.1" },
          { releaseType: "minor", expectedVersion: "0.1.0-rc.1" },
          { releaseType: "patch", expectedVersion: "0.0.1-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.0-alpha.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0" },
          { releaseType: "minor", expectedVersion: "1.0.0" },
          { releaseType: "patch", expectedVersion: "1.0.0" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-alpha.2" },
          { releaseType: "minor", expectedVersion: "1.0.0-alpha.2" },
          { releaseType: "patch", expectedVersion: "1.0.0-alpha.2" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.0.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.0.0-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.0.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.0.0-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.0-beta.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0" },
          { releaseType: "minor", expectedVersion: "1.0.0" },
          { releaseType: "patch", expectedVersion: "1.0.0" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.0.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.0.0-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-beta.2" },
          { releaseType: "minor", expectedVersion: "1.0.0-beta.2" },
          { releaseType: "patch", expectedVersion: "1.0.0-beta.2" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.0.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.0.0-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.0-rc.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0" },
          { releaseType: "minor", expectedVersion: "1.0.0" },
          { releaseType: "patch", expectedVersion: "1.0.0" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.0.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.0.0-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.0.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.0.0-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.0-rc.2" },
          { releaseType: "minor", expectedVersion: "1.0.0-rc.2" },
          { releaseType: "patch", expectedVersion: "1.0.0-rc.2" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.0",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0" },
          { releaseType: "minor", expectedVersion: "1.1.0" },
          { releaseType: "patch", expectedVersion: "1.0.1" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.1-alpha.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1" },
          { releaseType: "minor", expectedVersion: "1.0.1" },
          { releaseType: "patch", expectedVersion: "1.0.1" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-alpha.2" },
          { releaseType: "minor", expectedVersion: "1.0.1-alpha.2" },
          { releaseType: "patch", expectedVersion: "1.0.1-alpha.2" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-beta.1" },
          { releaseType: "minor", expectedVersion: "1.0.1-beta.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-rc.1" },
          { releaseType: "minor", expectedVersion: "1.0.1-rc.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.1-beta.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1" },
          { releaseType: "minor", expectedVersion: "1.0.1" },
          { releaseType: "patch", expectedVersion: "1.0.1" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.0.1-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-beta.2" },
          { releaseType: "minor", expectedVersion: "1.0.1-beta.2" },
          { releaseType: "patch", expectedVersion: "1.0.1-beta.2" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-rc.1" },
          { releaseType: "minor", expectedVersion: "1.0.1-rc.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.1-rc.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1" },
          { releaseType: "minor", expectedVersion: "1.0.1" },
          { releaseType: "patch", expectedVersion: "1.0.1" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.0.1-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-beta.1" },
          { releaseType: "minor", expectedVersion: "1.0.1-beta.1" },
          { releaseType: "patch", expectedVersion: "1.0.1-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.0.1-rc.2" },
          { releaseType: "minor", expectedVersion: "1.0.1-rc.2" },
          { releaseType: "patch", expectedVersion: "1.0.1-rc.2" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.0.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0" },
          { releaseType: "minor", expectedVersion: "1.1.0" },
          { releaseType: "patch", expectedVersion: "1.0.2" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.0.2-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.0.2-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.0.2-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.1.0-alpha.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0" },
          { releaseType: "minor", expectedVersion: "1.1.0" },
          { releaseType: "patch", expectedVersion: "1.1.0" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-alpha.2" },
          { releaseType: "minor", expectedVersion: "1.1.0-alpha.2" },
          { releaseType: "patch", expectedVersion: "1.1.0-alpha.2" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.1.0-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.1.0-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.1.0-beta.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0" },
          { releaseType: "minor", expectedVersion: "1.1.0" },
          { releaseType: "patch", expectedVersion: "1.1.0" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.1.0-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-beta.2" },
          { releaseType: "minor", expectedVersion: "1.1.0-beta.2" },
          { releaseType: "patch", expectedVersion: "1.1.0-beta.2" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.1.0-rc.1" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.1.0-rc.1",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0" },
          { releaseType: "minor", expectedVersion: "1.1.0" },
          { releaseType: "patch", expectedVersion: "1.1.0" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.1.0-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.1.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.1.0-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "1.1.0-rc.2" },
          { releaseType: "minor", expectedVersion: "1.1.0-rc.2" },
          { releaseType: "patch", expectedVersion: "1.1.0-rc.2" }
        ]
      }
    ]
  },
  {
    currentVersion: "1.1.0",
    branches: [
      {
        branch: "main",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0" },
          { releaseType: "minor", expectedVersion: "1.2.0" },
          { releaseType: "patch", expectedVersion: "1.1.1" }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-alpha.1" },
          { releaseType: "minor", expectedVersion: "1.2.0-alpha.1" },
          { releaseType: "patch", expectedVersion: "1.1.1-alpha.1" }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-beta.1" },
          { releaseType: "minor", expectedVersion: "1.2.0-beta.1" },
          { releaseType: "patch", expectedVersion: "1.1.1-beta.1" }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          { releaseType: "major", expectedVersion: "2.0.0-rc.1" },
          { releaseType: "minor", expectedVersion: "1.2.0-rc.1" },
          { releaseType: "patch", expectedVersion: "1.1.1-rc.1" }
        ]
      }
    ]
  }
];
