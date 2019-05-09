const EOL = require('os').EOL
const xlsx = require('node-xlsx')

exports.reportDownload = () => {
  return async (ctx, next) => {
    await next()

    try {
      const {filename, tableHeader, rowList, format = 'xlsx'} = ctx.state
      if (!filename || !tableHeader || !rowList) {
        return
      }

      const tableContent = []
      tableContent.push(formatTableRow(tableHeader, format))

      for (let rowData of rowList) {
        tableContent.push(formatTableRow(rowData, format))
      }

      if (format === 'json') {
        ctx.body = {
          status: 0,
          data: {
            name: filename,
            content: tableContent,
          },
        }
        return
      }

      if (format === 'csv') {
        ctx.set('Content-Type', 'text/csv; charset=utf-8')
        ctx.set('Content-Disposition', `attachment; filename=${filename}`)
        ctx.body = Buffer.concat([Buffer.from('\xEF\xBB\xBF', 'binary'), Buffer.from(tableContent.join(EOL))])
        return
      }

      let xlsxBuffer = xlsx.build([{
        name: filename,
        data: tableContent,
      }])
      ctx.set({
        'Content-Disposition': 'attachment;filename=' + encodeURIComponent(filename),
        'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      ctx.body = xlsxBuffer
    } catch (err) {
      ctx.throw(401)
    }
  }
}

function formatTableRow(rowList, format = 'xlsx') {
  if (['json', 'csv'].includes(format)) {
    return rowList.join(',')
  }
  return rowList
}

