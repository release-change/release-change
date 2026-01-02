import type { LastRelease, ReleaseType } from "@release-change/shared";

export const mockedNextReleasesInMonorepo: {
  lastRelease: LastRelease;
  branches: {
    branch: string;
    releaseTypes: {
      releaseType: { name: string; pathname: string; releaseType: NonNullable<ReleaseType> }[];
      nextReleases: {
        name: string;
        pathname: string;
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
          pathname: ".",
          gitTag: null,
          version: "0.0.0"
        },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
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
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "1.0.0" },
              { name: "", pathname: ".", version: "1.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.1.0" },
              { name: "", pathname: ".", version: "0.1.0" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.0.1" },
              { name: "", pathname: ".", version: "0.0.1" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.0.0-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "0.1.0-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "0.0.1-alpha.1", npmTag: "alpha" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.0.0-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "0.1.0-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "0.0.1-beta.1", npmTag: "beta" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.0.0-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "0.1.0-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "0.0.1-rc.1", npmTag: "next" }
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
          pathname: ".",
          gitTag: "v1.2.3-alpha.1",
          version: "1.2.3-alpha.1"
        },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
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
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "1.0.0" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.1.0" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.0.1" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" },
              { name: "", pathname: ".", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.2", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.2", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.2", npmTag: "alpha" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.1", npmTag: "beta" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.1", npmTag: "next" }
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
          pathname: ".",
          gitTag: "v1.2.3-beta.1",
          version: "1.2.3-beta.1"
        },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
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
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "1.0.0" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.2.0" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.1.1" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.2.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.1-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.1", npmTag: "alpha" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.2", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.2.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.2", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.1-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.2", npmTag: "beta" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.2.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.1-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.1", npmTag: "next" }
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
          pathname: ".",
          gitTag: "v1.2.3-rc.1",
          version: "1.2.3-rc.1"
        },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
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
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "1.0.0" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.10.0" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.9.9" },
              { name: "", pathname: ".", version: "1.2.3" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.10.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.9.9-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.3-alpha.1", npmTag: "alpha" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.10.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.9.9-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.3-beta.1", npmTag: "beta" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.2", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.10.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.2", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.9.9-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.3-rc.2", npmTag: "next" }
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
          pathname: ".",
          gitTag: "v1.2.3",
          version: "1.2.3"
        },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
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
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "1.0.0" },
              { name: "", pathname: ".", version: "2.0.0" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.1.0" },
              { name: "", pathname: ".", version: "1.3.0" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              { name: "@monorepo/a", pathname: "packages/a", version: "0.0.1" },
              { name: "", pathname: ".", version: "1.2.4" }
            ]
          }
        ]
      },
      {
        branch: "alpha",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "2.0.0-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.3.0-alpha.1", npmTag: "alpha" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-alpha.1",
                npmTag: "alpha"
              },
              { name: "", pathname: ".", version: "1.2.4-alpha.1", npmTag: "alpha" }
            ]
          }
        ]
      },
      {
        branch: "beta",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "2.0.0-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.3.0-beta.1", npmTag: "beta" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-beta.1",
                npmTag: "beta"
              },
              { name: "", pathname: ".", version: "1.2.4-beta.1", npmTag: "beta" }
            ]
          }
        ]
      },
      {
        branch: "next",
        releaseTypes: [
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "major" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "major" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "1.0.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "2.0.0-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "minor" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "minor" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.1.0-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.3.0-rc.1", npmTag: "next" }
            ]
          },
          {
            releaseType: [
              { name: "", pathname: ".", releaseType: "patch" },
              { name: "@monorepo/a", pathname: "packages/a", releaseType: "patch" }
            ],
            nextReleases: [
              {
                name: "@monorepo/a",
                pathname: "packages/a",
                version: "0.0.1-rc.1",
                npmTag: "next"
              },
              { name: "", pathname: ".", version: "1.2.4-rc.1", npmTag: "next" }
            ]
          }
        ]
      }
    ]
  }
];
