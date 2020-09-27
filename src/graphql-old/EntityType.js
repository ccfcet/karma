const { gql } = require('apollo-server-express');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    entity_type(id: ID): [EntityType!]
  }

  type EntityType {
    id: ID!
    value: String!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
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
  },
};

const loaders = {};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
