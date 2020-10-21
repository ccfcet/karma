const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');

module.exports = {
  Query: {
    state: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.state).select().where('id', id);
      } else {
        result = await connection(tableNames.state).select();
      }
      return result;
    },
  },
  State: {
    country: async (parent, _, ctx) => {
      return ctx.stateCountryLoader.load(parent.id);
    },
  },
};
