let Promise = require('bluebird')

let models = require('_/data/models')

let getPasswordHashIfExists = function (userId) {
  return new Promise(function (resolve, reject) {
    models.authentication.authentication_information_local.findOne({
      where: {
        people_id: userId
      },
      attributes: ['password_hash']
    }).then(function (passwordHash) {
      if (passwordHash) {
        resolve(passwordHash)
      } else {
        reject(new Error("password hash doesn't exist"))
      }
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = getPasswordHashIfExists
