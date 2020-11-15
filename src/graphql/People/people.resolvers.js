const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');
const {
  createPeopleSchema,
  updatePeopleSchema,
  deletePeopleSchema,
} = require('./people.validation');
const { handleError } = require('../../lib/utils');

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
        result = await connection(tableNames.people).select();
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
    email: async (parent, _, ctx) => {
      return ctx.peopleEmailLoader.load(parent.id);
    },
    course_instance: async (parent, _, ctx) => {
      return ctx.peopleCourseInstanceLoader.load(parent.id);
    },
  },
  Mutation: {
    createPeople: async (_, { people }) => {
      try {
        await createPeopleSchema.validate(people, { abortEarly: false });
        const email = people.email;
        delete people.email;
        const [peopleResult] = await connection(tableNames.people)
          .insert(people)
          .returning('*');
        await connection(tableNames.email).insert({
          email_id: email,
          people_id: peopleResult.id,
        });
        return peopleResult;
      } catch (err) {
        let errorCode = 'CREATE_PEOPLE_ERROR';
        return handleError(err, errorCode);
      }
    },
    updatePeople: async (_, { people }) => {
      try {
        await updatePeopleSchema.validate(people, { abortEarly: false });
        const peopleID = people.id;
        delete people.id;
        const [peopleResult] = await connection(tableNames.people)
          .where({ id: peopleID })
          .update(people)
          .returning('*');
        return peopleResult;
      } catch (err) {
        let errorCode = 'UPDATE_PEOPLE_ERROR';
        return handleError(err, errorCode);
      }
    },
    deletePeople: async (_, { id }) => {
      try {
        console.log(id);
        await deletePeopleSchema.validate({ id }, { abortEarly: false });
        await connection(tableNames.people).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_PEOPLE_ERROR';
        return handleError(err, errorCode);
      }
    },
  },
  MutatePeopleResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'People';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
  DeletePeopleResult: {
    __resolveType: (obj) => {
      if (obj.message) {
        return 'Success';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
};
