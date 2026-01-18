# @release-change/cli

## 0.1.3

### Dependencies updates

- @release-change/ci@0.1.2
- @release-change/commit-analyser@0.1.2
- @release-change/config@0.1.2
- @release-change/get-packages@0.1.2
- @release-change/git@0.1.3
- @release-change/github@0.1.2
- @release-change/logger@0.1.2
- @release-change/release@0.1.3
- @release-change/shared@0.1.2

---

**Full changelog:** [`@release-change/cli@v0.1.2...@release-change/cli@v0.1.3`](https://github.com/release-change/release-change/compare/@release-change/cli@v0.1.2...@release-change/cli@v0.1.3)

## 0.1.2

### Dependencies updates

- @release-change/git@0.1.2
- @release-change/release@0.1.2

---

**Full changelog:** [`@release-change/cli@v0.1.1...@release-change/cli@v0.1.2`](https://github.com/release-change/release-change/compare/@release-change/cli@v0.1.1...@release-change/cli@v0.1.2)

## 0.1.1

### Patch changes

- **cli:** use `cli` package manifest for workspace version and required Node versions ([`09ee7a5`](https://github.com/release-change/release-change/commit/09ee7a51b66ee3497be5c614a63ef79122ac1bea))

### Dependencies updates

- @release-change/ci@0.1.1
- @release-change/commit-analyser@0.1.1
- @release-change/config@0.1.1
- @release-change/get-packages@0.1.1
- @release-change/git@0.1.1
- @release-change/github@0.1.1
- @release-change/logger@0.1.1
- @release-change/release@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/cli@v0.1.0...@release-change/cli@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/cli@v0.1.0...@release-change/cli@v0.1.1)

## 0.1.0

### Minor changes

- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **github:** prepare tagging pull requests and issues with labels telling the release ([`4dc2d26`](https://github.com/release-change/release-change/commit/4dc2d267181d1eeaedb14575c8e6ca185b2b9e15))
- **github:** close issues related to commit ([`bf22cfd`](https://github.com/release-change/release-change/commit/bf22cfda8ce494b2ebb7b80f7ae7844486cccd9a))
- **github:** prepare fail comment posting ([`3357c50`](https://github.com/release-change/release-change/commit/3357c50a1901f57eafe70bc46b52b6beb2bf691c))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **git:** prepare Git tag removal ([`0b69ecc`](https://github.com/release-change/release-change/commit/0b69ecc8d4c18a22a21cde095824fcd202e04161))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **git:** pass `cwd` option when running `git` commands ([`efb6069`](https://github.com/release-change/release-change/commit/efb6069fcc9ffb8310d5b40e5dce82be0c24b736))
- **release:** prepare file update commits ([`49a2761`](https://github.com/release-change/release-change/commit/49a2761071aedb342b3c2d28f84ff595eea7eec0))
- **github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/release-change/release-change/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))
- **config:** do not check remote repository URL any longer ([`33b096b`](https://github.com/release-change/release-change/commit/33b096b79b6613987206833870101dcf70e34ce9))
- **cli:** manage remote Git repo name with CLI flag or config file ([`9e7f21f`](https://github.com/release-change/release-change/commit/9e7f21fbd400bcf80358748b28a115f08d530221))
- **logger:** enable message logging without any formatting ([`cef13b2`](https://github.com/release-change/release-change/commit/cef13b2d2f6d102252e2ccad4788bb342c21fdc8))
- **cli:** set next release considering each package to release in a monorepo context ([`3f88b05`](https://github.com/release-change/release-change/commit/3f88b05fc623051c11f6b4128842697fe938d607))
- **commit-analyser:** get release type for each package, considering internal dependencies ([`c67054c`](https://github.com/release-change/release-change/commit/c67054cbfa33c752d18181383bed7f1d34bc1e46))
- **cli:** set last release for each package ([`c275869`](https://github.com/release-change/release-change/commit/c275869598ce3637d538823924d07b0d2e8dce63))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))
- **semver:** add `semver` package ([`ec8d180`](https://github.com/release-change/release-change/commit/ec8d1802451de45d884d65d4fcad992c9e5caafb))

### Patch changes

- **cli:** display Git incompatible version found using `version` property or `null` ([`f932593`](https://github.com/release-change/release-change/commit/f932593409606190edf1945d4e7331d7dc2033a0))
- **cli:** fix separator for Git tag packages other than root ([`c64e130`](https://github.com/release-change/release-change/commit/c64e130711f9d3308897c051663c9fe6b12fdf53))
- **cli:** fix path to `package.json` file ([`27f2e11`](https://github.com/release-change/release-change/commit/27f2e117721bcf71b50a1c232bb5c1d886e6b667))

### Dependencies updates

- @release-change/ci@0.1.0
- @release-change/commit-analyser@0.1.0
- @release-change/config@0.1.0
- @release-change/get-packages@0.1.0
- @release-change/git@0.1.0
- @release-change/github@0.1.0
- @release-change/logger@0.1.0
- @release-change/release@0.1.0
- @release-change/semver@0.1.0
- @release-change/shared@0.1.0
