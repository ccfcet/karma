var Promise = require('bluebird')

let methodsPeople = require('_/data/methods/people')
let methodsAuthentication = require('_/data/methods/authentication')
let passwordVerifier = require('./password_verifier')
let generateAccessToken = require('../../../access_token').generateAccessToken

let emailPassword = function (email, password) {
  return new Promise(function (resolve, reject) {
    // find id of user associated with the email
    methodsPeople.getUserIdUsingEmail(email).then(function (userId) {
      methodsAuthentication.getPasswordHashIfExists(userId).then(function
      (passwordHash) {
        // verify the password
        passwordVerifier(password, passwordHash).then(function (result) {
          if (result === true) {
            generateAccessToken(userId).then(function (token) {
              resolve(token)
            }).catch(function (err) {
              console.log(err)
              reject(err)
            })
          } else {
            reject(new Error('password could not be verified.'))
          }
        }).catch(function (err) {
          console.log(err)
          reject(err)
        })
      }).catch(function (err) {
        console.log(err)
        reject(err)
      })
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = emailPassword
