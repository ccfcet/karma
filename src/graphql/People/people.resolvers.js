const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');

module.exports = {
  Query: {
    people: async (_, { id, entityID }) => {
      let result;
      if (id) {
        result = await connection(tableNames.people).select().where('id', id);
      } else if (entityID) {
        result = await connection(tableNames.people)
          .select([`${tableNames.people}.*`])
          .join(
            tableNames.role_people_entity,
            `${tableNames.people}.id`,
            `${tableNames.role_people_entity}.${tableNames.people}_id`
          )
          .where(
            `${tableNames.role_people_entity}.${tableNames.entity}_id`,
            entityID
          );
      } else {
        result = await connection('people').select();
      }
      return result;
    },
  },
  People: {
    nationality: async (parent, _, ctx) => {
      return ctx.peopleNationalityLoader.load(parent.id);
    },
    address: async (parent, _, ctx) => {
      return ctx.peopleAddressLoader.load(parent.id);
    },
  },
};
