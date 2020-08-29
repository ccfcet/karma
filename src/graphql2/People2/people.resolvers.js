const connection = require('../../db/db');

module.exports = {
  Query: {
    peopleByEnitity2: async (_, { entityID }) => {
      let result;
      if (entityID) {
        result = await connection('role_people_entity')
          .select()
          .where('entity_id', entityID);
      } else {
        result = await connection('role_people_entity').select();
      }
      console.log(result);
      return result;
    },
    people2: async (_, { id, entityID }) => {
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
  PeopleByEnitity2: {
    people2: async (parent, _, ctx) => {
      console.log(parent);
      return ctx.peopleOfEntityLoader.load(parent.map((k) => k.people_id));
    },
  },
};
