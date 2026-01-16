# @release-change/config

## 0.1.1

### Dependencies updates

- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/config@v0.1.0...@release-change/config@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/config@v0.1.0...@release-change/config@v0.1.1)

## 0.1.0

### Minor changes

- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **npm:** prepare publication to NPM registry ([`9b36f14`](https://github.com/release-change/release-change/commit/9b36f142a08c88dc329e9c625e19793dc69d1fad))
- **config:** do not check remote repository URL any longer ([`33b096b`](https://github.com/release-change/release-change/commit/33b096b79b6613987206833870101dcf70e34ce9))
- **cli:** manage remote Git repo name with CLI flag or config file ([`9e7f21f`](https://github.com/release-change/release-change/commit/9e7f21fbd400bcf80358748b28a115f08d530221))
- **logger:** enable message logging without any formatting ([`cef13b2`](https://github.com/release-change/release-change/commit/cef13b2d2f6d102252e2ccad4788bb342c21fdc8))
- **commit-analyser:** get release type for each package, considering internal dependencies ([`c67054c`](https://github.com/release-change/release-change/commit/c67054cbfa33c752d18181383bed7f1d34bc1e46))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))

### Dependencies updates

- @release-change/logger@0.1.0
- @release-change/shared@0.1.0
