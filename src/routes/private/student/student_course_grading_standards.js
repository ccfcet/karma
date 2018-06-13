var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')
router.get('/', (req, res) => {
  res.json({'Status': 'Hello'})
})

router.post('/', (req, res) => {
  var info = {}
  info.standard_name = req.body.standardName
  info.standard_description = req.body.standardDescription
  methods.students.CourseGradingStandard.createStandard(info)
    .then((created) => {
      res.json({
        'Status': 'Success',
        'State': created
      })
    }).catch((err) => {
      res.json({
        'Status': 'Error',
        'State': err
      })
    })
})

module.exports = router
