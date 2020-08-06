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
        };
      });
      return newResult;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
