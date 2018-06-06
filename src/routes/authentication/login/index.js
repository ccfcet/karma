var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.json({
    'status': 200
  })
})

router.use('/karma', require('./karma'))

module.exports = router
