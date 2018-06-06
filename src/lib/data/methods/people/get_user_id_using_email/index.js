let Promise = require('bluebird')

let models = require('_/data/models')

let getUserIdUsingEmail = function (email) {
  return new Promise(function (resolve, reject) {
    // change raw query to sequelize functions when they add support for json
    // is this the best query?
    models.sequelize.query('SELECT people_id FROM people_informations as P WHERE (SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = P.id AND slug_id = (SELECT id FROM people_information_slugs WHERE slug_name = "email")), \'["' + email + '"]\') as check_flag) = 1',
    // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
      {type: models.sequelize.QueryTypes.SELECT})
      .then(function (result) {
        if (result[0] && result[0].hasOwnProperty('people_id')) {
          // user with email exists
          resolve(result[0].people_id)
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
