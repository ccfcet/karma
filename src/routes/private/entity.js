var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')
router.get('/', function (req, res) {
  res.json({'status': 'functional'})
})
router.post('/', function (req, res) {
  var info = {}
  if (req.body.hasOwnProperty('entityType') && req.body.hasOwnProperty('entityTypeSlug')) {
    info.entity_type = req.body['entityType']
    console.log(req.body['entityType'])
    info.entity_type_slug = req.body['entityTypeSlug']
    methods.Entities.obtainInformation.entityMethod.addEntity(info)
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

router.put('/:entityType/:entityTypeSlug', function (req, res) {
  var data = {}
  var info = {}
  info.entity_type = req.params.entityType
  info.entity_type_slug = req.params.entityTypeSlug
  if (req.body.hasOwnProperty('entityType') && req.body.hasOwnProperty('entityTypeSlug')) {
    data.entity_type = req.body.entityType
    data.entity_type_slug = req.body.entityTypeSlug
  }
  methods.Entities.obtainInformation.entityMethod.updateEntityTypes(info, data)
    .then((model) => {
      console.log(model)
      res.json({
        'status': 'updated',
        'data': model
      })
    })
    .catch((err) => {
      res.status(200).json({
        'status': 'not updated',
        'error': err

      })
    })
})
module.exports = router
