const { gql } = require('apollo-server-express');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    nationality(id: ID): [Nationality!]
  }

  type Nationality {
    id: ID!
    value: String!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
  Query: {
    nationality: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('nationality').select().where('id', id);
      } else {
        result = await connection('nationality').select();
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
