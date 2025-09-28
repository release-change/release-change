export const npmPackages = [
  {
    content: { name: "my-monorepo", version: "1.0.0", workspaces: ["packages/*"] },
    patterns: { include: ["packages/*"], exclude: ["**/node_modules/**"] },
    packages: [
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" }
    ]
  },
  {
    content: {
      name: "my-monorepo",
      version: "1.0.0",
      workspaces: ["my-app", "packages/*", "components/**"]
    },
    patterns: {
      include: ["my-app", "packages/*", "components/**"],
      exclude: ["**/node_modules/**"]
    },
    packages: [
      { name: "@monorepo/my-app", pathname: "my-app" },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "components/b" }
    ]
  }
];
