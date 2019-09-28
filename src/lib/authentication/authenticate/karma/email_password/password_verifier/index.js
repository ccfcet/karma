const Promise = require('bluebird');
const argon2 = require('argon2');

const passwordVerifier = function (password, passwordHash) {
  return new Promise(((resolve, reject) => {
    const options = {
      timeCost: 30, memoryCost: 2 ** 19, parallelism: 16, type: argon2.argon2i,
    };
    argon2.hash(password, options).then((hash) => {
      console.log(hash);


      argon2.verify(hash, passwordHash).then((match) => {
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
    }).catch((err) => {
      console.log(err);
    });
  }));
};

module.exports = passwordVerifier;
