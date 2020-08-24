const { gql } = require('apollo-server-express');
const { generateLoaders } = require('../lib/utils');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    address(id: ID): [Address!]
  }

  type Address {
    id: ID!
    line_1: String!
    line_2: String
    city: String!
    country: Country!
    state: State!
    zipcode: String!
    latitude: Float
    longtiude: Float
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
  Query: {
    address: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('address').select().where('id', id);
      } else {
        result = await connection('address').select();
      }
      return result;
    },
  },
  Address: {
    state: async (parent, _, ctx) => {
      return ctx.addressStateLoader.load(parent.id);
    },
    country: async (parent, _, ctx) => {
      return ctx.addressCountryLoader.load(parent.id);
    },
  },
};

const relations = [
  {
    loaderName: 'addressStateLoader',
    from: {
      table: 'address',
      column: 'address.state_id',
    },
    to: {
      table: 'state',
      column: 'state.id',
    },
    type: 'one-to-many',
  },
  {
    loaderName: 'addressCountryLoader',
    from: {
      table: 'address',
      column: 'address.country_id',
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
