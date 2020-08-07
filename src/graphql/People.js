const { People } = require('../models');
const { gql } = require('apollo-server-express');
const DataLoader = require('dataloader');

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
  },
};

const loaders = {
  peopleNationalityLoader: new DataLoader(async (peopleIds) => {
    const results = await People.query()
      .select('people.id as people_id')
      .join('nationality', 'people.nationality_id', '=', 'nationality.id')
      .select('nationality.*');
    let nationalityMap = {};
    results.forEach((result) => {
      nationalityMap[result.people_id] = result;
    });
    return peopleIds.map((peopleId) => nationalityMap[peopleId]);
  }),
};

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};
