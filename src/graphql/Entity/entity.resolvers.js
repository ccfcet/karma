const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');

module.exports = {
  Query: {
    entity_type: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.entity_type)
          .select()
          .where('id', id);
      } else {
        result = await connection(tableNames.entity_type).select();
      }
      return result;
    },
    entity: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.entity).select().where('id', id);
      } else {
        result = await connection(tableNames.entity).select();
      }
      return result;
    },
  },
  Entity: {
    entity_type: async (parent, _, ctx) => {
      return ctx.entityEntityTypeLoader.load(parent.id);
    },
    children: async (parent, _, ctx) => {
      return ctx.entityChildrenLoader.load(parent.id);
    },
  },
};
