var Promise = require('bluebird')

<<<<<<< HEAD
let methodsPeople = require('_/data/methods/People')
=======
let methodsPeople = require('_/data/methods/people')
>>>>>>> d2f8828cbae1d14ee76f2da28c39d2c66a5bfcb5

let emailPassword = function (email, password) {
  return new Promise(function (resolve, reject) {
    // find id of user associated with the email
    methodsPeople.getUserIdUsingEmail(email).then(function (userID) {
      // console.log(userID)
      resolve('rehjgjhadgsjfhgweruayriu3y28r7398472983rhfakjsbnfjsdhfkjh')
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = emailPassword
