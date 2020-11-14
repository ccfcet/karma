const Fastify = require('fastify');
const mercurius = require('mercurius');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs, resolvers, loaders } = require('./graphql');
const DataLoader = require('dataloader');

const app = Fastify();

app.register(mercurius, {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  jit: 1,
  graphiql: 'playground',
  context: () => {
    const ctxLoaders = {};
    const loaderEntries = Object.entries(loaders);
    loaderEntries.forEach(([loaderName, loaderFunction]) => {
      ctxLoaders[loaderName] = new DataLoader(loaderFunction);
    });
    return {
      ...ctxLoaders,
    };
  },
});

module.exports = app;
