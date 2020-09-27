const connection = require('../../db/db');

module.exports = {
  Query: {
    country: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('country').select().where('id', id);
      } else {
        result = await connection('country').select();
      }
      return result;
    },
  },
};
