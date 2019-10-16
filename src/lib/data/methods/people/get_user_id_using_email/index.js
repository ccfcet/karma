const Promise = require('bluebird');

const models = require('../../../models');

const getUserIdUsingEmail = function (email) {
  return new Promise(((resolve, reject) => {
    // change raw query to sequelize functions when they add support for json
    // is this the best query?
    // eslint-disable-next-line max-len
    models.sequelize.query(`SELECT people_id FROM people_information as P WHERE (SELECT JSON_CONTAINS((SELECT data FROM people_information WHERE people_id = P.people_id AND slug_id = (SELECT id FROM people_information_slugs WHERE slug_name = "email")), '"${email}"') as check_flag) = 1`,
    // TODO: Change this query.
    // models.sequelize.query(`SELECT people_id from people_information where slug_id = (SELECT id FROM people_information_slugs WHERE slug_name = "email") AND data = '"${email}"'`,
    // models.sequelize.query(`SELECT people_id FROM people_information WHERE slug_id = (SELECT id FROM people_information_slugs WHERE slug_name = "email") AND JSON_CONTAINS("(SELECT data FROM people_information WHERE )", '"${email}"')`)
    // eslint-disable-next-line max-len
    // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
      { type: models.sequelize.QueryTypes.SELECT })
      .then((result) => {
        console.log(result);
        if (result[0] && Object.prototype.hasOwnProperty
          .call(result[0], 'people_id')) {
          // user with email exists
          resolve(result[0].people_id);
        } else {
          reject(new Error('User with email not found.'));
        }
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
  }));
};

module.exports = getUserIdUsingEmail;
