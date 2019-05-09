用于报表下载的koa中间件

## Installation

```shell
$ npm install --save report-download
```

## Usage：

```javascript
// router
const downloadMiddleware = require('report-download')

router.get('/download', downloadMiddleware.reportDownload(), downloadController)

// Controller
const filename = 'filename'
const tableHeader = ['title1', "title2"]
const rowList = [['data', "data"], ['data', "data"]]
const format = 'xlsx' // or 'csv' or 'json'
ctx.state = {filename, tableHeader, rowList, format}
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/find-ip-location.svg?style=flat-square
[npm-url]: https://npmjs.org/package/find-ip-location
[travis-image]: https://img.shields.io/travis/liuwill/find-ip-location/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/liuwill/find-ip-location
[download-image]: https://img.shields.io/npm/dm/find-ip-location.svg?style=flat-square
[download-url]: https://npmjs.org/package/find-ip-location
[coverage-image]: https://img.shields.io/coveralls/liuwill/find-ip-location/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/liuwill/find-ip-location
[licence-image]: https://img.shields.io/npm/l/find-ip-location.svg?style=flat-square
[david-dependency-image]: https://img.shields.io/david/liuwill/find-ip-location.svg?style=flat-square
[david-dev-image]: https://img.shields.io/david/dev/liuwill/find-ip-location.svg?style=flat-square
[quality-image]: https://img.shields.io/codeclimate/github/liuwill/find-ip-location.svg?style=flat-square
[quality-url]: https://codeclimate.com/github/liuwill/find-ip-location
[bithound-image]: https://img.shields.io/bithound/code/github/liuwill/find-ip-location.svg?style=flat-square
[bithound-url]: https://www.bithound.io/github/liuwill/find-ip-location
[appveyor-image]: https://img.shields.io/appveyor/ci/liuwill/find-ip-location/master.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/liuwill/find-ip-location
[maintainability-image]: https://api.codeclimate.com/v1/badges/622c9f4f3cd0b2349b41/maintainability
[maintainability-url]: https://codeclimate.com/github/liuwill/find-ip-location/maintainability
