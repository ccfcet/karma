const { gql } = require('apollo-server-express');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    country(id: ID): [Country!]
  }

  type Country {
    id: ID!
    name: String!
    code: String!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
  Query: {
    country: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('country').select().where('id', id);
      } else {
        result = await connection('country').select();
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
