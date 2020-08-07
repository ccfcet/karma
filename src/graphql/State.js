const { State } = require('../models');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    state(id: ID): [State!]
  }

  type State {
    id: ID!
    name: String!
    code: String!
    country: Country!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
`;

const resolvers = {
  Query: {
    state: async (_, { id }) => {
      let result;
      if (id) {
        result = await State.query().where('id', id);
      } else {
        result = await State.query();
      }
      const newResult = result.map((element) => {
        return {
          id: element.id,
          name: element.name,
          code: element.code,
          createdAt: element.created_at,
          updatedAt: element.updated_at,
          deletedAt: element.deleted_at,
        };
      });
      return newResult;
    },
  },
  State: {
    country: async (parent) => {
      const [result] = await State.relatedQuery('country').for(parent.id);
      return result;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
