// node binding to argon2 reference implementation
const argon2 = require('argon2');
const models = require('../../data/models');

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;
let id = 0;

const setAuthentication = function (userID, password, firstname, middlename, lastname, gender, nationality, dob) {
  // parameters to argon2 hashing function (strictly for password.length >= 12)
  // added safety factor 256
  return new Promise(((resolve, reject) => {
    const options = {
      timeCost: 30, memoryCost: 2 ** 19, parallelism: 16, type: argon2.argon2i,
    };

    argon2.hash(password, options).then((hash) => {
      models.sequelize.query(`INSERT INTO people (first_name, middle_name, last_name, gender, date_of_birth, nationality, created_at, updated_at) VALUES ("${firstname}","${middlename}","${lastname}","${gender}","${dob}","${nationality}","${dateTime}","${dateTime}")`,
      // eslint-disable-next-line max-len
      // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
        { type: models.sequelize.QueryTypes.INSERT })
        .then((result) => {
          id = result[0];
          console.log(result);
          return new Promise(((resolve, reject) => {
            models.sequelize.query(`INSERT INTO people_information (people_id, slug_id, data, created_at, updated_at) VALUES (${id},1,'"${userID}"',"${dateTime}","${dateTime}")`,
              // eslint-disable-next-line max-len
              // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
              { type: models.sequelize.QueryTypes.INSERT })
              .then((result) => {
                console.log(result);
                return new Promise(((resolve, reject) => {
                  models.sequelize.query(`INSERT INTO authentication_information_local (people_id, password_hash, created_at, updated_at) VALUES (${id},"${hash}","${dateTime}","${dateTime}")`,
                    // eslint-disable-next-line max-len
                    // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
                    { type: models.sequelize.QueryTypes.INSERT })
                    .then((result) => {
                      console.log(result);
                      resolve(result);
                    }).catch((err) => {
                      console.log(err);
                      reject(err);
                    });
                }));
                resolve(result);
              }).catch((err) => {
                console.log(err);
                reject(err);
              });
          }));
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      console.log(hash);
      resolve(hash);
    }).catch((err) => {
      console.log(err);
    });
  }));
};

module.exports = setAuthentication;


// const Promise = require('bluebird');
// const argon2 = require('argon2');

// const passwordVerifier = function (password, passwordHash) {
//   return new Promise(((resolve, reject) => {
//     const options = {
//       timeCost: 30, memoryCost: 2 ** 19, parallelism: 16, type: argon2.argon2i,
//     };
//     argon2.hash(password, options).then((hash) => {
//       console.log(hash);

//   })
// }
// ));
// };

// module.exports = passwordVerifier;GET
