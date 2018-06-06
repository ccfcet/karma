var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

router.post('/', function (req, res) {
  var info = {}

  info.official_courseId = req.body.official_courseId
  info.name = req.body.name
  info.credits = req.body.credits
  info.valid_start_date = req.body.valid_start_date
  info.valid_end_date = req.body.valid_end_date
  info.duration_in_days = req.body.duration_in_days

  methods.Academics.addCoursesOffered(info)
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
