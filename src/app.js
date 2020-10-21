const Fastify = require('fastify');
const GQL = require('fastify-gql');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs, resolvers, loaders } = require('./graphql');

const app = Fastify();

app.register(GQL, {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  jit: 1,
  graphiql: 'playground',
  context: () => {
    return loaders;
  },
});

module.exports = app;
