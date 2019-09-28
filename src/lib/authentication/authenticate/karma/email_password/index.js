const Promise = require('bluebird');

const methodsPeople = require('data/methods/people');
const methodsAuthentication = require('data/methods/authentication');
const passwordVerifier = require('./password_verifier');
const { generateAccessToken } = require('../../../access_token');

const emailPassword = function (email, password) {
  return new Promise(((resolve, reject) => {
    // find id of user associated with the email
    methodsPeople.getUserIdUsingEmail(email).then((userId) => {
      console.log(userId);
      methodsAuthentication.getPasswordHashIfExists(userId)
        .then((passwordHash) => {
          // verify the password
          passwordVerifier(password, passwordHash).then((result) => {
            if (result === true) {
              console.log(result);
              generateAccessToken(userId).then((token) => {
                resolve(token);
              }).catch((err) => {
                console.log(err);
                reject(err);
              });
            } else {
              reject(new Error('password could not be verified.'));
            }
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = emailPassword;
