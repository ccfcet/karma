var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')
router.get('/', function (req, res) {
  res.json({'status': 'functional'})
})
router.post('/', function (req, res) {
  var info = {}
  if (req.body.hasOwnProperty('entityType') && req.body.hasOwnProperty('entityTypeSlug')) {
    info.id = req.body['Id']
    info.entity_type = req.body['entityType']
    console.log(req.body['entityType'])
    info.entity_type_slug = req.body['entityTypeSlug']
    methods.Entities.obtainInformation.addEntity(info)
      .then((model) => {
        console.log(model)
        res.json(model)
      })
      .catch((err) => {
        res.status(500).json({
          'status': 'error',
          'error': err
        })
      })
  }
})

module.exports = router
