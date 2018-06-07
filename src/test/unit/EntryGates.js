// Contains tests for all the entry gates.

require('mocha')
var chai = require('chai')
var chaiHttp = require('chai-http')

var app = require('../../app.js')
// var models = require('../../data/models/')

var expect = chai.expect
chai.use(chaiHttp)

// For testing entry gates - refer api documentation
describe('Test the Entry Gates', function () {
  it('GET /', function (done) {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('Object')
        console.log(res.body)
        expect(res.body).to.have.property('name')
        expect(res.body.name).to.have.equal('Karma API')
        expect(res.body).to.have.property('version')
        expect(res.body.version).to.equal('1.0.0-alpha-1')
        done()
        if (err) {
          console.log(err)
        }
      })
  })

  it('GET /public/', (done) => {
    chai.request(app)
      .get('/public')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
        if (err) {
          console.log(err)
        }
      })
  })

  it('GET /public/menu', (done) => {
    chai.request(app)
      .get('/public/menu')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
        if (err) {
          console.log(err)
        }
      })
  })

  it('GET /public/information', (done) => {
    chai.request(app)
      .get('/public/information')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
        if (err) {
          console.log(err)
        }
      })
  })
})

describe('Public-Informtion', function () {
  it('GET /public/information/:entityInformationSlug/:entitySlug', function () {
    chai.request(app)
      .get('/public/information/about/cse')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('json')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.equal('Back-end API framework for colleges.')
        expect(res.body).to.have.property('title')
        expect(res.body.title).to.equal('Karma')
      })
  })

  it('GET /public/information/:entityInformationSlug/:entitySlug', function () {
    chai.request(app)
      .get('/public/information/about/robotics')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(501)
        expect(res.body).to.be.a('Object')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.be.a('json')
        expect(res.body.data.success).to.equal('success')
        expect(res.body.data.code).to.equal('information-empty')
      })
  })
})

describe('Public - Menu', function () {
  it('/public/menu/:entity/:menuType', function () {
    chai.request(app)
      .get('/public/menu/:entity/:menuType')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
      })
  })
})
