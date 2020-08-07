const { DataType } = require('../models');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    dataType(id: ID): [DataType!]
  }

  type DataType {
    id: ID!
    value: String!
  }
`;

const resolvers = {
  Query: {
    dataType: async (_, { id }) => {
      let result;
      if (id) {
        result = await DataType.query().where('id', id);
      } else {
        result = await DataType.query();
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
