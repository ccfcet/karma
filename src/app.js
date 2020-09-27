const Fastify = require('fastify');
const GQL = require('fastify-gql');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs, resolvers } = require('./graphql');
const { peopleOfEntityLoader } = require('./dataLoaders.js');

const app = Fastify();

app.register(GQL, {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  jit: 1,
  graphiql: 'playground',
  context: () => {
    return {
      peopleOfEntityLoader,
    };
  },
});

module.exports = app;
