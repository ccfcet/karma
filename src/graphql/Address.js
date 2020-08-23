const { Address } = require('../models');
const { gql } = require('apollo-server-express');
const { generateLoader } = require('../lib/utils');

const typeDefs = gql`
  extend type Query {
    address(id: ID): [Address!]
  }

  type Address {
    id: ID!
    line1: String!
    line2: String
    city: String!
    country: Country!
    state: State!
    zipcode: String!
    latitude: Float
    longtiude: Float
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
`;

const resolvers = {
  Query: {
    address: async (_, { id }) => {
      let result;
      if (id) {
        result = await Address.query().where('id', id);
      } else {
        result = await Address.query();
      }
      const newResult = result.map((element) => {
        return {
          id: element.id,
          line1: element.line_1,
          line2: element.line_2,
          city: element.city,
          country: element.country,
          state: element.state,
          zipcode: element.zipcode,
          latitude: element.latitude,
          longtiude: element.longtiude,
          createdAt: element.created_at,
          updatedAt: element.updated_at,
          deletedAt: element.deleted_at,
        };
      });
      return newResult;
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

const countryOptions = {
  loaderName: 'addressCountry',
  from: {
    table: 'address',
    column: 'address.country_id',
  },
  to: {
    table: 'country',
    column: 'country.id',
  },
  type: 'one-to-many',
};

const stateOptions = {
  loaderName: 'addressState',
  from: {
    table: 'address',
    column: 'address.state_id',
  },
  to: {
    table: 'state',
    column: 'state.id',
  },
  type: 'one-to-many',
};

const loaders = {
  addressCountryLoader: generateLoader(countryOptions),
  addressStateLoader: generateLoader(stateOptions),
};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
