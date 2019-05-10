const assert = require('assert');
const request = require("supertest");
const reportDownload = require('../index')
const Koa = require('koa')
const app = new Koa()

describe('#reportDownload()', function() {

  let server

  before(function(done) {
    server = app.listen(8000, "127.0.0.1", function(err) {
      if(err) done(err);
      done();
    });

    app.use(reportDownload.reportDownload())
  });

  after(function (done) {
    if(server) {
      server.close(done);
    } else {
      done();
    }
  });

  it('no $reportConfig', function(done) {
    request(server).get('/')
      .expect(404, done);
  });

  it('no (filename && tableHeader && rowList)', function(done) {
    app.use(function(ctx, next) {
      ctx.state.$reportConfig = {}
      next()
    })

    request(server).get('/')
      .expect(404, done);
  });

  it('no format should return xlsx', function(done) {
    app.use(setCtx())

    request(server).get('/')
      .expect('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .expect(200, done)
  });

  it('xlsx format should return xlsx', function(done) {
    app.use(setCtx('xlsx'))

    request(server).get('/')
      .expect('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .expect(200, done)
  });

  it('csv format should return csv', function(done) {
    app.use(setCtx('csv'))

    request(server).get('/')
      .expect('Content-type', 'text/csv; charset=utf-8')
      .expect(200, done)
  });

  it('json format should return json', function(done) {
    app.use(setCtx('json'))

    request(server).get('/')
      .expect(200)
      .then(response => {
        assert.ok(response.body && typeof response.body.data === 'object')
        done()
      })
  });
});

function setCtx(format) {
  return function(ctx, next) {
    ctx.state.$reportConfig = {
      filename: 'filename',
      tableHeader: ['title1', "title2"],
      rowList: [['data', "data"], ['data', "data"]],
      format: format
    }
    next()
  }
}
