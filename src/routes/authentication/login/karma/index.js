var express = require('express')
var router = express.Router()

let authenticationAuthenticateKarma = require('_/authentication/authenticate/karma')

router.get('/', function (req, res, next) {
  res.json({
    'status': 200
  })
})

router.post('/', function (req, res, next) {
  if (req.headers['content-type'] === 'application/json') {
    if (req.body.hasOwnProperty('password')) {
      // is https really secure?
      if (req.body.hasOwnProperty('email') &&
      !req.body.hasOwnProperty('mobileNumber')) {
        // assumption: user has an email

        // verify the email password combo
        authenticationAuthenticateKarma.emailPassword(
          req.body.hasOwnProperty('email'), req.body.hasOwnProperty('password'))
          .then(function (token) {
            res.json({
              'token': token
            })
          }).catch(function (err) {
            console.error(err)
            res.json({
              'status': 500
            })
          })
      } else if (!req.body.hasOwnProperty('email') &&
      req.body.hasOwnProperty('mobileNumber')) {
        // assumption: user has a mobileNumber
        res.json({
          'status': 200
        })
      } else {
        res.status(400).json({
          'status': 400
        })
      }
    } else {
      res.status(400).json({
        'status': 400
      })
    }
  } else {
    res.status(400).json({
      'status': 400
    })
  }
})

module.exports = router
