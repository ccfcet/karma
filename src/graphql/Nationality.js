const { Nationality } = require('../models');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    nationality(id: ID): [Nationality!]
  }

  type Nationality {
    id: ID!
    value: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
`;

const resolvers = {
  Query: {
    nationality: async (_, { id }) => {
      let result;
      if (id) {
        result = await Nationality.query().where('id', id);
      } else {
        result = await Nationality.query();
      }
      const newResult = result.map((element) => {
        return {
          id: element.id,
          value: element.value,
          createdAt: element.created_at,
          updatedAt: element.updated_at,
          deletedAt: element.deleted_at,
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
