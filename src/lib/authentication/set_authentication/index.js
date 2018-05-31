let setAuthentication = function (userID, password) {
  // node binding to argon2 reference implementation
  const argon2 = require('argon2')

  // parameters to argon2 hashing function (strictly for password.length >= 12)
  // added safety factor 256
  const options = {
    timeCost: 30, memoryCost: 2 ** 19, parallelism: 16, type: argon2.argon2i
  }

  argon2.hash(password, options).then(hash => {
    console.log(hash)
  }).catch(err => {
    console.log(err)
  })
}

module.exports = setAuthentication
