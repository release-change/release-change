import type { ReleaseType } from "@release-change/commit-analyser";
import type { LastRelease } from "@release-change/shared";

export const mockedNextReleasesInMonorepo: {
  lastRelease: LastRelease;
  branches: {
    branch: string;
    releaseTypes: {
      releaseType: { name: string; releaseType: NonNullable<ReleaseType> }[];
      nextReleases: {
        name: string;
        version: string;
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
          gitTag: null,
          version: "0.0.0"
        },
        {
          name: "@monorepo/a",
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
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.0.0" },
              { name: "@monorepo/a", version: "1.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "0.1.0" },
              { name: "@monorepo/a", version: "0.1.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "0.0.1" },
              { name: "@monorepo/a", version: "0.0.1" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.0.0-alpha.1" },
              { name: "@monorepo/a", version: "1.0.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "0.1.0-alpha.1" },
              { name: "@monorepo/a", version: "0.1.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "0.0.1-alpha.1" },
              { name: "@monorepo/a", version: "0.0.1-alpha.1" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.0.0-beta.1" },
              { name: "@monorepo/a", version: "1.0.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "0.1.0-beta.1" },
              { name: "@monorepo/a", version: "0.1.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "0.0.1-beta.1" },
              { name: "@monorepo/a", version: "0.0.1-beta.1" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.0.0-rc.1" },
              { name: "@monorepo/a", version: "1.0.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "0.1.0-rc.1" },
              { name: "@monorepo/a", version: "0.1.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "0.0.1-rc.1" },
              { name: "@monorepo/a", version: "0.0.1-rc.1" }
            ]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.2.3-alpha.1",
      packages: [
        {
          name: "",
          gitTag: "v1.2.3-alpha.1",
          version: "1.2.3-alpha.1"
        },
        {
          name: "@monorepo/a",
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
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "1.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "0.1.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "0.0.1" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.2" },
              { name: "@monorepo/a", version: "1.0.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.2" },
              { name: "@monorepo/a", version: "0.1.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.2" },
              { name: "@monorepo/a", version: "0.0.1-alpha.1" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.1" },
              { name: "@monorepo/a", version: "1.0.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.1" },
              { name: "@monorepo/a", version: "0.1.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.1" },
              { name: "@monorepo/a", version: "0.0.1-beta.1" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.1" },
              { name: "@monorepo/a", version: "1.0.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.1" },
              { name: "@monorepo/a", version: "0.1.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.1" },
              { name: "@monorepo/a", version: "0.0.1-rc.1" }
            ]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.2.3-beta.1",
      packages: [
        {
          name: "",
          gitTag: "v1.2.3-beta.1",
          version: "1.2.3-beta.1"
        },
        {
          name: "@monorepo/a",
          gitTag: "@monorepo/a@v0.1.0",
          version: "0.1.0"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "1.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "0.2.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "0.1.1" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.1" },
              { name: "@monorepo/a", version: "1.0.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.1" },
              { name: "@monorepo/a", version: "0.2.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.1" },
              { name: "@monorepo/a", version: "0.1.1-alpha.1" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.2" },
              { name: "@monorepo/a", version: "1.0.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.2" },
              { name: "@monorepo/a", version: "0.2.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.2" },
              { name: "@monorepo/a", version: "0.1.1-beta.1" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.1" },
              { name: "@monorepo/a", version: "1.0.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.1" },
              { name: "@monorepo/a", version: "0.2.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.1" },
              { name: "@monorepo/a", version: "0.1.1-rc.1" }
            ]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.2.3-rc.1",
      packages: [
        {
          name: "",
          gitTag: "v1.2.3-rc.1",
          version: "1.2.3-rc.1"
        },
        {
          name: "@monorepo/a",
          gitTag: "@monorepo/a@0.9.8",
          version: "0.9.8"
        }
      ]
    },
    branches: [
      {
        branch: "main",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "1.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "0.10.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3" },
              { name: "@monorepo/a", version: "0.9.9" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.1" },
              { name: "@monorepo/a", version: "1.0.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.1" },
              { name: "@monorepo/a", version: "0.10.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-alpha.1" },
              { name: "@monorepo/a", version: "0.9.9-alpha.1" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.1" },
              { name: "@monorepo/a", version: "1.0.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.1" },
              { name: "@monorepo/a", version: "0.10.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-beta.1" },
              { name: "@monorepo/a", version: "0.9.9-beta.1" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.2" },
              { name: "@monorepo/a", version: "1.0.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.2" },
              { name: "@monorepo/a", version: "0.10.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.3-rc.2" },
              { name: "@monorepo/a", version: "0.9.9-rc.1" }
            ]
          }
        ]
      }
    ]
  },
  {
    lastRelease: {
      ref: "1.2.3",
      packages: [
        {
          name: "",
          gitTag: "v1.2.3",
          version: "1.2.3"
        },
        {
          name: "@monorepo/a",
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
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "2.0.0" },
              { name: "@monorepo/a", version: "1.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.3.0" },
              { name: "@monorepo/a", version: "0.1.0" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.4" },
              { name: "@monorepo/a", version: "0.0.1" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "2.0.0-alpha.1" },
              { name: "@monorepo/a", version: "1.0.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.3.0-alpha.1" },
              { name: "@monorepo/a", version: "0.1.0-alpha.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.4-alpha.1" },
              { name: "@monorepo/a", version: "0.0.1-alpha.1" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "2.0.0-beta.1" },
              { name: "@monorepo/a", version: "1.0.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.3.0-beta.1" },
              { name: "@monorepo/a", version: "0.1.0-beta.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.4-beta.1" },
              { name: "@monorepo/a", version: "0.0.1-beta.1" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", releaseType: "major" },
              { name: "@monorepo/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "", version: "2.0.0-rc.1" },
              { name: "@monorepo/a", version: "1.0.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "minor" },
              { name: "@monorepo/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "", version: "1.3.0-rc.1" },
              { name: "@monorepo/a", version: "0.1.0-rc.1" }
            ]
          },
          {
            releaseType: [
              { name: "", releaseType: "patch" },
              { name: "@monorepo/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "", version: "1.2.4-rc.1" },
              { name: "@monorepo/a", version: "0.0.1-rc.1" }
            ]
          }
        ]
      }
    ]
  }
];
