const { State } = require('../models');
const { gql } = require('apollo-server-express');
const DataLoader = require('dataloader');

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
    country: async (parent, _, ctx) => {
      return ctx.stateCountryLoader.load(parent.id);
    },
  },
};

const loaders = {
  stateCountryLoader: new DataLoader(async (stateIds) => {
    const results = await State.query()
      .select('state.id as state_id')
      .join('country', 'state.country_id', '=', 'country.id')
      .select('country.*');
    let countryMap = {};
    results.forEach((result) => {
      countryMap[result.state_id] = result;
    });
    return stateIds.map((stateId) => countryMap[stateId]);
  }),
};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
