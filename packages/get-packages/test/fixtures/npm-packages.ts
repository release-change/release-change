export const npmPackages = [
  {
    content: { workspaces: ["packages/*"] },
    patterns: { include: ["packages/*"], exclude: ["**/node_modules/**"] },
    packages: [
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "packages/b" }
    ]
  },
  {
    content: { workspaces: ["my-app", "packages/*", "components/**"] },
    patterns: {
      include: ["my-app", "packages/*", "components/**"],
      exclude: ["**/node_modules/**"]
    },
    packages: [
      { name: "@monorepo/my-app", path: "my-app" },
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "components/b" }
    ]
  }
];
