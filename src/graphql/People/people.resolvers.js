const connection = require('../../db/db');

module.exports = {
  Query: {
    people: async (_, { id, entityID }) => {
      let result;
      if (id) {
        result = await connection('people').select().where('id', id);
      } else if (entityID) {
        result = await connection('people')
          .select(['role_people_entity.id as b_id', 'people.*'])
          .join(
            'role_people_entity',
            'people.id',
            'role_people_entity.people_id'
          )
          .where('role_people_entity.entity_id', entityID);
      } else {
        result = await connection('people').select();
      }
      console.log(result);
      return result;
    },
  },
};
