const { gql } = require('apollo-server-express');
const { generateLoaders } = require('../lib/utils');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    people(id: ID): [People!]
  }

  type People {
    id: ID!
    first_name: String!
    middle_name: String
    last_name: String!
    gender: String!
    date_of_birth: String!
    nationality: Nationality!
    address: [Address]!
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
  Query: {
    people: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('people').select().where('id', id);
      } else {
        result = await connection('people').select();
      }
      return result;
    },
  },
  People: {
    nationality: async (parent, _, ctx) => {
      return ctx.peopleNationalityLoader.load(parent.id);
    },
    address: async (parent, _, ctx) => {
      return ctx.peopleAddressLoader.load(parent.id);
    },
  },
};

const relations = [
  {
    loaderName: 'peopleNationalityLoader',
    type: 'one-to-many',
    from: {
      table: 'people',
      column: 'people.nationality_id',
    },
    to: {
      table: 'nationality',
      column: 'nationality.id',
    },
  },
  {
    loaderName: 'peopleAddressLoader',
    type: 'many-to-many',
    from: {
      table: 'people',
      column: 'people.id',
    },
    via: {
      table: 'people_address',
      column1: 'people_address.people_id',
      column2: 'people_address.address_id',
    },
    to: {
      table: 'address',
      column: 'address.id',
    },
  },
];

const loaders = generateLoaders(relations);

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
