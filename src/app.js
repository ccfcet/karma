const Fastify = require('fastify');
const mercurius = require('mercurius');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs, resolvers, loaders } = require('./graphql');

const app = Fastify();

app.register(mercurius, {
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
