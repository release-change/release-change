import type { PackageManifest } from "@release-change/config";
import type { DependencyUpdateMethod, PackageNextRelease } from "@release-change/shared";

export const mockedNextReleasesWithDependencies: {
  packageName: string;
  packagePath: string;
  packageManifestPath: string;
  nextRelease: PackageNextRelease;
  dependencyUpdateMethod: DependencyUpdateMethod;
  dependencies: PackageNextRelease[];
  expectedDependenciesUpdates: { name: string; version: string }[];
  packageManifest: PackageManifest;
  expectedPackageManifest: PackageManifest;
}[] = [
  {
    packageName: "root package",
    packagePath: ".",
    packageManifestPath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    },
    dependencyUpdateMethod: "workspace",
    dependencies: [],
    expectedDependenciesUpdates: [],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    }
  },
  {
    packageName: "root package",
    packagePath: ".",
    packageManifestPath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    },
    dependencyUpdateMethod: "caret-range",
    dependencies: [],
    expectedDependenciesUpdates: [],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    }
  },
  {
    packageName: "root package",
    packagePath: ".",
    packageManifestPath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    },
    dependencyUpdateMethod: "tilde-range",
    dependencies: [],
    expectedDependenciesUpdates: [],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    }
  },
  {
    packageName: "root package",
    packagePath: ".",
    packageManifestPath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    },
    dependencyUpdateMethod: "pin",
    dependencies: [],
    expectedDependenciesUpdates: [],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "workspace",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "workspace:*"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "workspace:*"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "workspace",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "workspace:*"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "workspace:*"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "caret-range",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "1.0.0"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "^1.0.0"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "caret-range",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "1.0.0"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "^1.0.0"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "tilde-range",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "1.0.0"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "~1.0.0"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "tilde-range",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "1.0.0"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "~1.0.0"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "pin",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "1.0.0"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/b": "1.0.0"
      }
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    },
    dependencyUpdateMethod: "pin",
    dependencies: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expectedDependenciesUpdates: [
      {
        name: "@monorepo/b",
        version: "1.0.0"
      }
    ],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "workspace:*"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/b": "1.0.0"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "workspace",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "workspace:*" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "workspace:*"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "workspace",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "workspace:*" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "workspace:*"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "caret-range",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "1.2.3" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "^1.2.3"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "caret-range",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "1.2.3" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "^1.2.3"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "tilde-range",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "1.2.3" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "~1.2.3"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "tilde-range",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "1.2.3" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "~1.2.3"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "pin",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "1.2.3" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      dependencies: {
        "@monorepo/a": "1.2.3"
      }
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      pathname: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    },
    dependencyUpdateMethod: "pin",
    dependencies: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedDependenciesUpdates: [{ name: "@monorepo/a", version: "1.2.3" }],
    packageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "1.2.2"
      }
    },
    expectedPackageManifest: {
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/release-change/release-change.git"
      },
      devDependencies: {
        "@monorepo/a": "1.2.3"
      }
    }
  }
];
