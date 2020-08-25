const { gql } = require('apollo-server-express');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    people(id: ID, entityID: ID): [People!]
    peopleByEnitity(entityID: ID!): PeopleByEnitity!
  }

  type People {
    id: ID!
    first_name: String!
    middle_name: String
    last_name: String!
    gender: String!
    date_of_birth: String!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }

  type PeopleByEnitity {
    id: ID!
    people_id: ID!
    people: [People]
  }
`;

const resolvers = {
  Query: {
    peopleByEnitity: async (_, { entityID }) => {
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
  PeopleByEnitity: {
    people: async (parent, _, ctx) => {
      console.log(parent);
      return ctx.peopleOfEntityLoader.load(parent.map((k) => k.people_id));
    },
  },
};
module.exports = {
  typeDefs,
  resolvers,
};
