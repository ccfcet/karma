const { People } = require('../models');
const { gql } = require('apollo-server-express');
const { generateLoader } = require('../lib/utils');

const typeDefs = gql`
  extend type Query {
    people(id: ID): [People!]
  }

  type People {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
    gender: String!
    dateOfBirth: String!
    nationality: Nationality!
    address: [Address]!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
`;

const resolvers = {
  Query: {
    people: async (_, { id }) => {
      let result;
      if (id) {
        result = await People.query().where('id', id);
      } else {
        result = await People.query();
      }
      const newResult = result.map((element) => {
        return {
          id: element.id,
          firstName: element.first_name,
          middleName: element.middle_name,
          lastName: element.last_name,
          gender: element.gender,
          dateOfBirth: element.date_of_birth,
          createdAt: element.created_at,
          updatedAt: element.updated_at,
          deletedAt: element.deleted_at,
        };
      });
      return newResult;
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

const nationalityOptions = {
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
};

const addressOptions = {
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
  cache: false,
};

const loaders = {
  peopleNationalityLoader: generateLoader(nationalityOptions),
  peopleAddressLoader: generateLoader(addressOptions),
};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
