var express = require('express')
var router = express.Router()

require('_/data/methods')

router.get('/', function (req, res) {
  res.send({ 'status': 200 })
})

router.use('/courses_offered', require('./courses_offered'))
router.use('/classes', require('./classes'))
router.use('/classes_time_tables', require('./classes_time_tables'))

module.exports = router
