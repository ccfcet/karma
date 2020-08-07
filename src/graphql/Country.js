const { Country } = require('../models');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    country(id: ID): [Country!]
  }

  type Country {
    id: ID!
    name: String!
    code: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
`;

const resolvers = {
  Query: {
    country: async (_, { id }) => {
      let result;
      if (id) {
        result = await Country.query().where('id', id);
      } else {
        result = await Country.query();
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
};

const loaders = {};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
