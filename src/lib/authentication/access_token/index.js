const jwt = require('jsonwebtoken');

const accessTokenHandlers = {};

const { secretKey } = require('./secrets.json');

accessTokenHandlers.generateAccessToken = function (userId) {
  return new Promise(((resolve, reject) => {
    jwt.sign({ userId }, secretKey, { algorithm: 'HS256' }, (err, token) => {
      if (!err) {
        if (token) {
          console.log(token);
          resolve(token);
        } else {
          reject(new Error('Unexpected error at accessTokenHandlers'
          + '.generateAccessToken'));
        }
      } else {
        console.log(err);
        reject(err);
      }
    });
  }));
};

module.exports = accessTokenHandlers;
