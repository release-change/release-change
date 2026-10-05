# @release-change/get-packages

## 0.4.0

### Minor changes

- **get-packages:** enable package manager detection through `packageManager` property ([`5471002`](https://github.com/release-change/release-change/commit/5471002fd4756a5ed49f34f16d77e06c0e2bc14e))
- add support for Yarn ([`ecc8232`](https://github.com/release-change/release-change/commit/ecc82324fb0d0d0d737b7031a6cad1540273f363))

### Patch changes

- **get-packages:** do not throw error if `package.json` not found ([`45f7961`](https://github.com/release-change/release-change/commit/45f7961e52f0c03fa919b33174bda5d010e3ab0a))
- **get-packages:** detect package manager through user agent before detecting `PNPM_HOME` ([`c2cd2fa`](https://github.com/release-change/release-change/commit/c2cd2fa609331b2762ed55c762ab518815ec9090))
- use current working directory to run package managers commands ([`c4dbac2`](https://github.com/release-change/release-change/commit/c4dbac2902e24f1adb59b2fcf66afb38a70f12c8))

### Dependencies updates

- @release-change/config@0.4.0
- @release-change/logger@0.4.0
- @release-change/semver@0.2.0
- @release-change/shared@0.4.0

---

**Full changelog:** [`@release-change/get-packages@v0.3.2...@release-change/get-packages@v0.4.0`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.3.2...@release-change/get-packages@v0.4.0)

## 0.3.2

### Patch changes

- **get-packages:** check the package manager version is compatible with the minimum version required ([`dbc892b`](https://github.com/release-change/release-change/commit/dbc892b819df02868cbe100c19003fc3de0d81d7))

---

**Full changelog:** [`@release-change/get-packages@v0.3.1...@release-change/get-packages@v0.3.2`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.3.1...@release-change/get-packages@v0.3.2)

## 0.3.1

### Patch changes

- **get-packages:** return `null` if `npm_config_user_agent` does not set a version of npm ([`f6ae104`](https://github.com/release-change/release-change/commit/f6ae104cd1f344178eca71c5a937a66feca18413))

---

**Full changelog:** [`@release-change/get-packages@v0.3.0...@release-change/get-packages@v0.3.1`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.3.0...@release-change/get-packages@v0.3.1)

## 0.3.0

### Dependencies updates

- @release-change/config@0.3.0
- @release-change/logger@0.3.0
- @release-change/shared@0.3.0

---

**Full changelog:** [`@release-change/get-packages@v0.2.2...@release-change/get-packages@v0.3.0`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.2.2...@release-change/get-packages@v0.3.0)

## 0.2.2

### Dependencies updates

- @release-change/config@0.2.1

---

**Full changelog:** [`@release-change/get-packages@v0.2.1...@release-change/get-packages@v0.2.2`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.2.1...@release-change/get-packages@v0.2.2)

## 0.2.1

### Patch changes

- **get-packages:** stop throwing an error when no `packages` field is found in `pnpm-workspace.yaml` (#655) ([`79f5bad`](https://github.com/release-change/release-change/commit/79f5badfc33dd5dfe8850fa36f45410475654503))

---

**Full changelog:** [`@release-change/get-packages@v0.2.0...@release-change/get-packages@v0.2.1`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.2.0...@release-change/get-packages@v0.2.1)

## 0.2.0

### Dependencies updates

- @release-change/config@0.2.0
- @release-change/logger@0.2.0
- @release-change/shared@0.2.0

---

**Full changelog:** [`@release-change/get-packages@v0.1.3...@release-change/get-packages@v0.2.0`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.1.3...@release-change/get-packages@v0.2.0)

## 0.1.3

### Dependencies updates

- @release-change/config@0.1.3
- @release-change/logger@0.1.3
- @release-change/shared@0.1.3

---

**Full changelog:** [`@release-change/get-packages@v0.1.2...@release-change/get-packages@v0.1.3`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.1.2...@release-change/get-packages@v0.1.3)

## 0.1.2

### Dependencies updates

- @release-change/config@0.1.2
- @release-change/logger@0.1.2
- @release-change/shared@0.1.2

---

**Full changelog:** [`@release-change/get-packages@v0.1.1...@release-change/get-packages@v0.1.2`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.1.1...@release-change/get-packages@v0.1.2)

## 0.1.1

### Dependencies updates

- @release-change/config@0.1.1
- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/get-packages@v0.1.0...@release-change/get-packages@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/get-packages@v0.1.0...@release-change/get-packages@v0.1.1)

## 0.1.0

### Minor changes

- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **release-notes-generator:** prepare changelog file creation and update ([`521d199`](https://github.com/release-change/release-change/commit/521d199de35957f86730af939ddc0be7917fa89a))
- **release:** prepare lock file update ([`72482b8`](https://github.com/release-change/release-change/commit/72482b80a0bafec10cc0c0ff7ea497f7757c7a62))
- **commit-analyser:** get release type for each package, considering internal dependencies ([`c67054c`](https://github.com/release-change/release-change/commit/c67054cbfa33c752d18181383bed7f1d34bc1e46))
- **cli:** set last release for each package ([`c275869`](https://github.com/release-change/release-change/commit/c275869598ce3637d538823924d07b0d2e8dce63))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))

### Patch changes

- **get-packages:** make regular expression accept patterns in double quotes ([`5a50c1f`](https://github.com/release-change/release-change/commit/5a50c1fb61b2e54f4b53d1b8a8ad257e8542a99a))
- **get-packages:** add more ways of checking the package manager used ([`fd2513e`](https://github.com/release-change/release-change/commit/fd2513ec2bd63a8230f31bcfd0efd253833a3a7e))

### Dependencies updates

- @release-change/config@0.1.0
- @release-change/logger@0.1.0
- @release-change/shared@0.1.0
