const { Address } = require('../models');
const { gql } = require('apollo-server-express');
const DataLoader = require('dataloader');

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

const loaders = {
  addressStateLoader: new DataLoader(async (addressIds) => {
    const results = await Address.query()
      .select('address.id as address_id')
      .join('state', 'address.state_id', '=', 'state.id')
      .select('state.*');
    let stateMap = {};
    results.forEach((result) => {
      stateMap[result.address_id] = result;
    });
    return addressIds.map((addressId) => stateMap[addressId]);
  }),

  addressCountryLoader: new DataLoader(async (addressIds) => {
    const results = await Address.query()
      .select('address.id as address_id')
      .join('country', 'address.country_id', '=', 'country.id')
      .select('country.*');
    let countryMap = {};
    results.forEach((result) => {
      countryMap[result.address_id] = result;
    });
    return addressIds.map((addressId) => countryMap[addressId]);
  }),
};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
