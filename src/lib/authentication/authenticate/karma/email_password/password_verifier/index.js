var Promise = require('bluebird')
const argon2 = require('argon2')

let passwordVerifier = function (password, passwordHash) {
  return new Promise(function (resolve, reject) {
    argon2.verify(passwordHash, password).then(function (match) {
      if (match) {
        // password match
        resolve(true)
      } else {
        // password did not match
        resolve(false)
      }
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = passwordVerifier
