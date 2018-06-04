let Promise = require('bluebird')

let models = require('_/data/models')

let getUserIdUsingEmail = function (email) {
  return new Promise(function (resolve, reject) {
    models.People.people.findOne({
      include:
      [
        {
          model: models.People.people_information,
          where: { data: email },
          attributes: []
        }
        // ,
        // { model: models.Entities.people_information_slugs,
        //   where: { slug_name: 'email' },
        //   attributes: []
        // }
      ]
    }).then(function (user) {
      if (user) {
        resolve(user)
      } else {
        reject(new Error('User with email not found.'))
      }
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = getUserIdUsingEmail
