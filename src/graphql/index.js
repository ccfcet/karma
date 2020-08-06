const { buildSchema } = require('graphql');
const Nationality = require('./Nationality');

const rootSchema = buildSchema(`
  ${Nationality.schema}

  type RootQuery {
    ${Nationality.query}
  }

  schema {
    query: RootQuery
  }
`);

const rootResolver = {
  ...Nationality.resolvers,
};

module.exports = {
  rootSchema,
  rootResolver,
};
