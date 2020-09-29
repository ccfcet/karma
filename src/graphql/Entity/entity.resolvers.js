const connection = require('../../db/db');

module.exports = {
  Query: {
    entity_type: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('entity_type').select().where('id', id);
      } else {
        result = await connection('entity_type').select();
      }
      return result;
    },
    entity: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('entity').select().where('id', id);
      } else {
        result = await connection('entity').select();
      }
      return result;
    },
  },
};
