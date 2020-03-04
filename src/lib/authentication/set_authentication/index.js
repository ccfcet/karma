const bcrypt = require('bcrypt');

const saltRound = 10;
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
    bcrypt.hash(password, saltRound).then((hash) => {
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
//
//     /* Note on the Options Used with Argon2
//     *
//     * Me(@jilvin) and @santhisenan arrived at these values to ensure that brute
//     * forcing within the current hardware landscape will take at least 100 years
//     * on average to break the hash. Moreover it was considered as an experiment
//     * to be run within the college servers to see how it goes and to provide an
//     * active academic opportunity in the area.(ie. the options was set from an
//     * academic perspective rather than a production perspective, to move to
//     * better config as it rolls out).
//     *
//     * I strongly suggest that use of argon2 over bcrypt should be strongly
//     * considered. Argon2 was designed to be secure against a wider range of
//     * attack vectors. This should be considered only as a pointer towards usage
//     * consideration but not advisory since I have very little knowledge in the
//     * area. Moreover the algorithm is new within the cryptographic community and
//     * there might be vulnerabilities waiting to be discovered(publicly).
//     *
//     * PS: I don't exactly remember at the moment whether such a huge allocation
//     * of memory to each individual thread was intentional or a mistake from our
//     * part. Future use of argon2 should be carried out after proper evaluation
//     * of the options.
//     */
//     const options = {
//       timeCost: 30, memoryCost: 2 ** 19, parallelism: 16, type: argon2.argon2i,
//     };
//     argon2.hash(password, options).then((hash) => {
//       console.log(hash);
//     })
//   }
// ));
// };

// module.exports = passwordVerifier;GET
