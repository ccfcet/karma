var Promise = require('bluebird')

let passwordVerifier = function (password, passwordHash) {
  return new Promise(function (resolve, reject) {
    resolve(true)
  })
}

module.exports = passwordVerifier
