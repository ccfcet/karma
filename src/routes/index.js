var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.json({
    'name': 'College of Engineering Trivandrum Information API',
    'version': '1.0.0-alpha-1'
  })
})

router.use('/public', require('./public'))
router.use('/private', require('./private'))

module.exports = router
