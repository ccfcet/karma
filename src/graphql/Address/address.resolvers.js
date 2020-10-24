const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');

module.exports = {
  Query: {
    address: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.address).select().where('id', id);
      } else {
        result = await connection(tableNames.address).select();
      }
      return result;
    },
  },
  Address: {
    state: async (parent, _, ctx) => {
      return ctx.addressStateLoader.load(parent.id);
    },
    country: async (parent, _, ctx) => {
      return ctx.addressCountryLoader.load(parent.id);
    },
  },
};
