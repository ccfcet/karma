const Promise = require('bluebird');
// const argon2 = require('argon2');
const bcrypt = require('bcrypt');

const saltRound = 10;

const passwordVerifier = function (password, passwordHash) {
  return new Promise(((resolve, reject) => {
    bcrypt.compare(password, passwordHash).then((match) => {
      if (match) {
        // password match
        resolve(true);
      } else {
        // password did not match
        resolve(false);
      }
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = passwordVerifier;
