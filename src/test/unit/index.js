// tests for routes/public/information/index.js
var assert = chai.assert

it('Testing / route', function (done) {
  chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
})
