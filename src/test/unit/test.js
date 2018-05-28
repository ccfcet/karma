'use strict'
/* eslint-env node, mocha */

// tests for routes/public/information/index.js
var mocha = require('mocha')
var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../../app.js')
// var entities = require('../data/models/Entities/entities')
// var entity_types = require('../data/models/Entities/entity_types')
// var entity_information_slugs = require('../data/models/Entities/entity_information_slugs')
var models = require('../../data/models/')

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
  before(async function () {
    console.log('Entities' + JSON.stringify(models))
    // models.Entities.entity_types.create({entity_type: 'department', entity_type_slug: 'department'})
    // entities.create({ entity_name: 'cse', entity_slug: 'cse', entity_type_id: entity_type.id })
    // entity_information_slug = entity_information_slugs.create({slug_name: 'cse'})
  })

  it('GET /public/information/:entityInformationSlug/:entitySlug', function () {
    chai.request(app)
      .get('/public/information/about/cse')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(200)
        res.should.be.json
        res.body.should.have.property('data')
        res.body.data.should.be.json
        res.body.data.data.should.equal('Back-end API framework for colleges.')
        res.body.data.title.should.equal('Karma')
      })
  })
  it('GET /public/information/:entityInformationSlug/:entitySlug', function () {
    chai.request(app)
      .get('/public/information/about/robotics')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(501)
        res.should.be.json
        res.body.should.have.property('data')
        res.body.data.should.be.json
        res.body.data.success.should.equal('success')
        res.body.data.code.should.equal('information-empty')
      })
  })
})


describe('Public - Menu', function() {
  it('/public/menu/:entity/:menuType', function() {
    chai.request(app)
    .get('/public/menu/:entity/:menuType')
    .end( (err, res) => {
      if(err) {
        console.log(err)
      }
      
    })
  })
})
