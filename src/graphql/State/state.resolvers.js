const connection = require('../../db/db');

module.exports = {
  Query: {
    state: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('state').select().where('id', id);
      } else {
        result = await connection('state').select();
      }
      return result;
    },
  },
};
