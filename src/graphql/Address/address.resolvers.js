const connection = require('../../db/db');

module.exports = {
  Query: {
    address: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('address').select().where('id', id);
      } else {
        result = await connection('address').select();
      }
      return result;
    },
  },
};
