用于报表下载的koa中间件

## Installation

```shell
$ npm install --save report-export
```

## Usage：

```javascript
// router
const downloadMiddleware = require('report-export')

router.get('/download', downloadMiddleware.reportDownload(), downloadController)

// Controller
const filename = 'filename'
const tableHeader = ['title1', "title2"]
const rowList = [['data', "data"], ['data', "data"]]
const format = 'xlsx' // or 'csv' or 'json'
ctx.state.$reportConfig = {filename, tableHeader, rowList, format}
```

## License

  MIT
