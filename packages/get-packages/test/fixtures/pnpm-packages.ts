export const pnpmPackages = [
  {
    content: `packages:
  - 'packages/*'

catalog:
  chalk: ^4.1.2

catalogs:
  react16:
    react: ^16.7.0
    react-dom: ^16.7.0
  react17:
    react: ^17.10.0
    react-dom: ^17.10.0`,
    patterns: { include: ["packages/*"], exclude: ["**/node_modules/**"] },
    packages: [
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" }
    ]
  },
  {
    content: `packages:
  # specify a package in a direct subdirectory of the root
  - 'my-app'
  # all packages in direct subdirectories of packages/
  - 'packages/*'
  # all packages in subdirectories of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'`,
    patterns: {
      include: ["my-app", "packages/*", "components/**"],
      exclude: ["**/node_modules/**", "**/test/**"]
    },
    packages: [
      { name: "@monorepo/my-app", pathname: "my-app" },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "components/b" }
    ]
  }
];
