let accessTokenHandlers = {}
let secretKey = require('./secrets.json').secretKey

var jwt = require('jsonwebtoken')

accessTokenHandlers.generateAccessToken = function (userId) {
  return new Promise(function (resolve, reject) {
    jwt.sign({ 'userId': userId }, secretKey, { algorithm: 'HS256' }, function (err, token) {
      if (!err) {
        if (token) {
          console.log(token)
          resolve(token)
        } else {
          reject(new Error('Unexpected error at accessTokenHandlers.generateAccessToken'))
        }
      } else {
        console.log(err)
        reject(err)
      }
    })
  })
}

module.exports = accessTokenHandlers
