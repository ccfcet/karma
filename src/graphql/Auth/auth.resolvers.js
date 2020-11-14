const tableNames = require('../../constants/tableNames');
const connection = require('../../db/db');
const argon2 = require('argon2');
const { createAccessToken } = require('./jwt');

module.exports = {
  Query: {
    login: async (_, { identifier, password }) => {
      const result = await connection(tableNames.email)
        .join(
          tableNames.auth,
          `${tableNames.email}.${tableNames.people}_id`,
          `${tableNames.auth}.${tableNames.people}_id`
        )
        .where({
          email_id: identifier,
        });

      const verificationStatus = await argon2.verify(
        result[0].password_hash,
        password
      );
      if (verificationStatus) {
        return createAccessToken({
          id: result[0].people_id,
        });
      }
      return 'FAIL';
    },
  },
};
