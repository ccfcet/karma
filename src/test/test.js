/* eslint-env node, mocha */

// tests for routes/public/information/index.js
var mocha = require('mocha')
var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../app.js')

// var assert = chai.assert
var should = chai.should()
chai.use(chaiHttp)

describe('Test the Entry Gates', function () {
  it('GET /', function (done) {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.have.property('name')
        res.body.name.should.equal('Karma API')
        res.body.should.have.property('version')
        res.body.version.should.equal('1.0.0-alpha-1')
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
        res.should.have.status(200)
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
        res.should.have.status(200)
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
        res.should.have.status(200)
        done()
        if (err) {
          console.log(err)
        }
      })
  })
})
it('GET /', function (done) {
  chai.request(app)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.have.property('name')
      res.body.name.should.equal('Karma API')
      res.body.should.have.property('version')
      res.body.version.should.equal('1.0.0-alpha-1')
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
      res.should.have.status(200)
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
      res.should.have.status(200)
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
      if (err) { res.should.have.status(200) }
      done()
      if (err) {
        console.log(err)
      }
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
      })
  })
})
