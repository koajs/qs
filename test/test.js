var request = require('supertest')
var koa = require('koa')

var qs = require('..')

describe('Koa Querystring', function () {
  it('should work', function (done) {
    var app = qs(koa())

    app.use(function* (next) {
      try {
        yield* next
      } catch (err) {
        console.error(err.stack)
      }
    })

    app.use(function* () {
      this.query.should.eql({
        a: [1, 2, 3]
      })
      this.query = {
        a: [1, 2]
      }
      this.query.should.eql({
        a: [1, 2]
      })
      this.querystring = 'a[0]=1&a[1]=2&a[2]=3'
      this.query.should.eql({
        a: [1, 2, 3]
      })

      this.status = 204
    })

    request(app.listen())
    .get('/?a[0]=1&a[1]=2&a[2]=3')
    .expect(204, done)
  })
})
