# @release-change/semver

## 0.1.0

### Minor changes

- **semver:** add function to check range comparator intersection ([`68f20df`](https://github.com/release-change/release-change/commit/68f20dfc5f767c6044d4c4ed5230811780ef8a16))
- **semver:** add functions to simplify a range ([`891dc91`](https://github.com/release-change/release-change/commit/891dc91429669d1b9934946f55b0b5bdeda9d5d9))
- **semver:** add functions to check if a subrange is a subset of a range ([`6886d1b`](https://github.com/release-change/release-change/commit/6886d1b1faf950e4ca55e75f452f3af762763e73))
- **semver:** add functions to check if a version is outside the bounds of the range ([`910d8d9`](https://github.com/release-change/release-change/commit/910d8d94bd65d5d43140ee4df3874cf150bf4c2f))
- **semver:** add function to get the lowest version which can match a range ([`8788d71`](https://github.com/release-change/release-change/commit/8788d719dbb1ddadb42289bddf523f10e72ff68e))
- **semver:** add functions to get min and max versions satisfying range ([`061eba3`](https://github.com/release-change/release-change/commit/061eba342a657368d6ced81428b01a0f27140bbc))
- **semver:** add functions to validate a range ([`9f14663`](https://github.com/release-change/release-change/commit/9f14663d9cfe29cb348813bfbbd8fdf5935ed360))
- **semver:** accept `null` and `undefined` in `Range` constructor and throw an error ([`8c79617`](https://github.com/release-change/release-change/commit/8c79617346c61634d7a4e68c32ef8c4b52b4733b))
- **semver:** add functions to show the difference between two versions ([`a8d41fc`](https://github.com/release-change/release-change/commit/a8d41fc280af4aa9ea4fecd76ac85768194604d4))
- **semver:** add functions to sort versions lists ([`62485d9`](https://github.com/release-change/release-change/commit/62485d99031b94433cb6af28148c72b2b5c37765))
- **semver:** add functions to compare two versions including builds ([`19e9511`](https://github.com/release-change/release-change/commit/19e9511466f77d9b51e7f12e5de4c191ead330b8))
- **semver:** add function to clean a version string ([`b513444`](https://github.com/release-change/release-change/commit/b51344436d7756d9d032f3bc115a183d31908b50))
- **semver:** remove build from `version` property of `Semver` object ([`5524917`](https://github.com/release-change/release-change/commit/5524917e793ac5db8f04ed7e54dedde370b81614))
- **semver:** add functions to compare two versions in loose mode ([`b089db6`](https://github.com/release-change/release-change/commit/b089db6b7c78bbbc3d796b67ee0efcdb957dd37b))
- **semver:** add functions to reverse compare two versions ([`204b240`](https://github.com/release-change/release-change/commit/204b240b42aacb21db1ee8d4ee3713e646acca2e))
- **semver:** add functions to get patch from version ([`bf825d4`](https://github.com/release-change/release-change/commit/bf825d439fe1434e877c9a79891cb2345c5e1d3d))
- **semver:** add functions to get minor from version ([`ffb9a31`](https://github.com/release-change/release-change/commit/ffb9a313a1ba9382e0bce178445634548c06f8e6))
- **semver:** add functions to get major from version ([`f25b537`](https://github.com/release-change/release-change/commit/f25b537db44b70181679ebaad125a48e32c2f6c9))
- **semver:** add `semver` package ([`ec8d180`](https://github.com/release-change/release-change/commit/ec8d1802451de45d884d65d4fcad992c9e5caafb))

### Patch changes

- **semver:** use an empty string if the operator is undefined in loose mode ([`4b6a81f`](https://github.com/release-change/release-change/commit/4b6a81f9a279e5491903b3277d49afe8be05b2f3))
- **semver:** fix range parsing with build and X-ranges ([`f99b995`](https://github.com/release-change/release-change/commit/f99b9954f8669c5caf985b0663bf218324375a48))
- **semver:** add exports for version and reverse comparison functions ([`1497e6d`](https://github.com/release-change/release-change/commit/1497e6dc0534de8be850fe7ff8f8fb408d4335bb))
- **semver:** fix regex to consider the `v=` pattern in loose mode ([`9809a90`](https://github.com/release-change/release-change/commit/9809a9065d513fafe586cdb6f69a2e5a085dcac0))
