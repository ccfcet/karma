const Promise = require('bluebird');

const models = require('../../../models');

const getPasswordHashIfExists = function (userId) {
  return new Promise(((resolve, reject) => {
    models.authentication.authentication_information_local.findOne({
      where: {
        people_id: userId,
      },
      raw: true,
      attributes: ['password_hash'],
    }).then((passwordHash) => {
      if (passwordHash) {
        resolve(passwordHash.password_hash);
      } else {
        reject(new Error("password hash doesn't exist"));
      }
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = getPasswordHashIfExists;
