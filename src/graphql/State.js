const { gql } = require('apollo-server-express');
const { generateLoaders } = require('../lib/utils');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    state(id: ID): [State!]
  }

  type State {
    id: ID!
    name: String!
    code: String!
    country: Country!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
  Query: {
    state: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('state').select().where('id', id);
      } else {
        result = await connection('state').select();
      }
      return result;
    },
  },
  State: {
    country: async (parent, _, ctx) => {
      return ctx.stateCountryLoader.load(parent.id);
    },
  },
};

const relations = [
  {
    loaderName: 'stateCountry',
    from: {
      table: 'state',
      column: 'state.country_id',
    },
    to: {
      table: 'country',
      column: 'country.id',
    },
    type: 'one-to-many',
  },
];

const loaders = generateLoaders(relations);

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
