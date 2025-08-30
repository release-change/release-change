import type { ReleaseType } from "../src/index.js";

import { getPackageDependencies } from "@release-change/get-packages";
import { afterEach, assert, beforeEach, it, vi } from "vitest";

import { adjustReleaseType } from "../src/adjust-release-type.js";
import { mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const mockedPackages = [
  {
    name: "",
    path: "."
  },
  {
    name: "@monorepo/a",
    path: "packages/a"
  },
  {
    name: "@monorepo/b",
    path: "packages/b"
  },
  {
    name: "@monorepo/c",
    path: "packages/c"
  }
];
const mockedInternalDependencies = {
  "packages/c": ["@monorepo/a", "@monorepo/b"]
} as Record<string, string[]>;
const packagesSets = [
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["major", "patch", null])],
      ["@monorepo/b", new Set(["minor", null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["major", "minor", "patch", null])],
      ["@monorepo/a", new Set(["major", "patch", null])],
      ["@monorepo/b", new Set(["minor", null])],
      ["@monorepo/c", new Set(["major", "minor", "patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["minor", "patch", null])],
      ["@monorepo/b", new Set(["patch", null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["minor", "patch", null])],
      ["@monorepo/a", new Set(["minor", "patch", null])],
      ["@monorepo/b", new Set(["patch", null])],
      ["@monorepo/c", new Set(["minor", "patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["patch", null])],
      ["@monorepo/b", new Set([null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["patch", null])],
      ["@monorepo/a", new Set(["patch", null])],
      ["@monorepo/b", new Set([null])],
      ["@monorepo/c", new Set(["patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set([null])],
      ["@monorepo/b", new Set([null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set([null])],
      ["@monorepo/a", new Set([null])],
      ["@monorepo/b", new Set([null])],
      ["@monorepo/c", new Set([null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["major", "patch", null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["major", "patch", null])],
      ["@monorepo/a", new Set(["major", "patch", null])],
      ["@monorepo/c", new Set(["major", "patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["minor", "patch", null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["minor", "patch", null])],
      ["@monorepo/a", new Set(["minor", "patch", null])],
      ["@monorepo/c", new Set(["minor", "patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["patch", null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["patch", null])],
      ["@monorepo/a", new Set(["patch", null])],
      ["@monorepo/c", new Set(["patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([["@monorepo/a", new Set([null])]]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set([null])],
      ["@monorepo/a", new Set([null])],
      ["@monorepo/c", new Set([null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["major", "patch", null])],
      ["@monorepo/c", new Set([null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["major", "patch", null])],
      ["@monorepo/a", new Set(["major", "patch", null])],
      ["@monorepo/c", new Set(["major", "patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["minor", "patch", null])],
      ["@monorepo/c", new Set([null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["minor", "patch", null])],
      ["@monorepo/a", new Set(["minor", "patch", null])],
      ["@monorepo/c", new Set(["minor", "patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set(["patch", null])],
      ["@monorepo/c", new Set([null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set(["patch", null])],
      ["@monorepo/a", new Set(["patch", null])],
      ["@monorepo/c", new Set(["patch", null])]
    ])
  },
  {
    packages: mockedPackages,
    internalDependencies: mockedInternalDependencies,
    releaseTypesPerPackage: new Map<string, Set<ReleaseType>>([
      ["@monorepo/a", new Set([null])],
      ["@monorepo/c", new Set([null])]
    ]),
    expected: new Map<string, Set<ReleaseType>>([
      ["", new Set([null])],
      ["@monorepo/a", new Set([null])],
      ["@monorepo/c", new Set([null])]
    ])
  }
];

beforeEach(() => {
  vi.mock("@release-change/get-packages", () => ({
    getPackageDependencies: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(packagesSets)(
  "should adjust the release type for the dependent packages",
  ({ packages, internalDependencies, releaseTypesPerPackage, expected }) => {
    vi.mocked(getPackageDependencies).mockImplementation((packagePath: string) => {
      const matchingKey = Object.keys(internalDependencies).find(key => packagePath.includes(key));
      return matchingKey ? (internalDependencies[matchingKey] ?? null) : null;
    });
    assert.deepEqual(
      adjustReleaseType({ ...mockedContextInMonorepo, packages }, releaseTypesPerPackage),
      expected
    );
  }
);
