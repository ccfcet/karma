const tableNames = require('../../constants/tableNames');
const connection = require('../../db/db');
const argon2 = require('argon2');

module.exports = {
  Query: {
    login: async (_, { identifier, password }) => {
      const hash = await argon2.hash(password);
      const result = await connection(tableNames.identifier).join(
        tableNames.auth,
        `${tableNames.identifier}.people_id`,
        `${tableNames.auth}.people_id`
      );
      console.log(identifier, hash);
      return (await argon2.verify(result[0].password_hash, password))
        ? 'PASS'
        : 'FAIL';
    },
  },
};
