export const npmPackages = [
  {
    content: { workspaces: ["packages/*"] },
    patterns: { include: ["packages/*"], exclude: ["**/node_modules/**"] },
    packages: [
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" }
    ]
  },
  {
    content: { workspaces: ["my-app", "packages/*", "components/**"] },
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
