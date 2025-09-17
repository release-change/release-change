import type { ReleaseType } from "@release-change/commit-analyser";
import type { LastRelease } from "@release-change/shared";

export const mockedNextReleases: {
  lastRelease: LastRelease;
  branches: {
    branch: string;
    releaseTypes: {
      releaseType: { name: string; path: string; releaseType: NonNullable<ReleaseType> }[];
      nextReleases: {
        name: string;
        path: string;
        version: string;
        npmTag?: string;
      }[];
    }[];
  }[];
}[] = [
  {
    lastRelease: {
      ref: null,
      packages: [
        {
          name: "",
          path: ".",
          gitTag: null,
          version: "0.0.0"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "0.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "0.0.1" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "0.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "0.0.1-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "0.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "0.0.1-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "0.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "0.0.1-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.0-alpha.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.0-alpha.1",
          version: "1.0.0-alpha.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.2", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.2", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.2", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.0-beta.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.0-beta.1",
          version: "1.0.0-beta.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.2", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.2", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.2", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.0-rc.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.0-rc.1",
          version: "1.0.0-rc.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.2", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.2", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.0-rc.2", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.0",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.0",
          version: "1.0.0"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.1-alpha.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.1-alpha.1",
          version: "1.0.1-alpha.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.2", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.2", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.2", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.1-beta.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.1-beta.1",
          version: "1.0.1-beta.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.2", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.2", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.2", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.1-rc.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.1-rc.1",
          version: "1.0.1-rc.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.2", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.2", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.1-rc.2", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.0.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.0.1",
          version: "1.0.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.2" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.2-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.2-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.0.2-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.1.0-alpha.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.1.0-alpha.1",
          version: "1.1.0-alpha.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.2", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.2", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.2", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.1.0-beta.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.1.0-beta.1",
          version: "1.1.0-beta.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.2", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.2", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.2", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.1.0-rc.1",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.1.0-rc.1",
          version: "1.1.0-rc.1"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.2", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.2", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.0-rc.2", npmTag: "next" }]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.1.0",
      packages: [
        {
          name: "",
          path: ".",
          gitTag: "v1.1.0",
          version: "1.1.0"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.2.0" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.1" }]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.2.0-alpha.1", npmTag: "alpha" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.1-alpha.1", npmTag: "alpha" }]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.2.0-beta.1", npmTag: "beta" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.1-beta.1", npmTag: "beta" }]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [{ name: "", path: ".", releaseType: "major" }],
            nextReleases: [{ name: "", path: ".", version: "2.0.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "minor" }],
            nextReleases: [{ name: "", path: ".", version: "1.2.0-rc.1", npmTag: "next" }]
          },
          {
            releaseType: [{ name: "", path: ".", releaseType: "patch" }],
            nextReleases: [{ name: "", path: ".", version: "1.1.1-rc.1", npmTag: "next" }]
          }
        ]
      }
    ]
  }
];
