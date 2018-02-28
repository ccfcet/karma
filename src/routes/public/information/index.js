var express = require('express')
var router = express.Router()
var models = require('../../../models')

router.get('/', function (req, res, next) {
  res.send({ 'status': 200 })
})

router.get('/:slug/:entity', function (req, res) {
  models.entityInformation.findAll({
    include:
    [
      {
        model: models.entities,
        attributes: [`ename`],
        where: { ename: req.params.entity }
      },
      { model: models.entitySlugs,
        attributes: [`slugName`],
        where: { slugName: req.params.slug } }
    ],
    // where: { ename: req.params.entity },
    attributes: ['data']
  }).then(function (result) {
    result = result[0].data
    res.json({ 'value': result })
    // return result;
  }).catch(function (err) {
    // handle error;
    console.log(err)
    res.json({ 'success': 'false' })
  })
})

router.get('/:slug/:position/:name', function (req, res) {
  models.peopleInformation.findAll({
    include: [
      {
        model: models.people,
        attributes: [`pslugname`],
        where: { pslugname: req.params.name }
      },
      {
        model: models.peopleSlugs,
        attributes: [`slugName`],
        where: { slugName: req.params.slug }
      }
    ],
    // where: { ename: req.params.entity },
    attributes: ['data']
  }).then(function (result) {
    result = result[0].data
    res.json({ 'value': result })
    // return result;
  }).catch(function (err) {
    // handle error;
    console.log(err)
    res.json({ 'success': 'false' })
  })
})

router.get('/faculties', function (req, res) {
  res.json({ 'value': 'hello' })
})

module.exports = router
