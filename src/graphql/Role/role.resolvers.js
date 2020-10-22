const tableNames = require('../../constants/tableNames');
const connection = require('../../db/db');

module.exports = {
  Query: {
    country: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.role).select().where('id', id);
      } else {
        result = await connection(tableNames.role).select();
      }
      return result;
    },
  },
};
