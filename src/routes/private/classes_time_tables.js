var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.post('/', function (req, res) {
  var info = {}
  info.day = req.body.day
  methods.Academics.addClassesTimeTables(info)
    .then((model) => {
      res.send(model)
    })
    .catch((err) => {
      res.send({
        'status': 'error',
        'error': err
      })
    })
})

module.exports = router
