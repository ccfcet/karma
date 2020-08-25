// const express = require('express');
// const morgan = require('morgan');
// const helmet = require('helmet');
const Fastify = require('fastify');
const GQL = require('fastify-gql');

// const { ApolloServer } = require('apollo-server-express');
const { rootTypeDef, rootResolver } = require('./graphql2');
const { peopleOfEntityLoader } = require('./dataLoaders.js');
const { makeExecutableSchema } = require('graphql-tools');

const app = Fastify();

// const routes = require('./routes');

require('./db/db');

// Middlewares
// app.use(morgan('tiny'));
// app.use(helmet());

// Routes
// app.use('/', );

// const server = new ApolloServer({
//   typeDefs: rootTypeDef,
//   resolvers: rootResolver,
//   context: () => {
//     return {
//       user:{
//         name:"rabeeh"
//       },
//       peopleOfEntityLoader
//     };
//   },
// });

app.register(GQL, {
  schema: makeExecutableSchema({
    typeDefs: rootTypeDef,
    resolvers: rootResolver,
  }),
  jit: 1,
  graphiql: 'playground',
  context: () => {
    return {
      peopleOfEntityLoader,
    };
  },
});

// server.applyMiddleware({ app });

module.exports = app;
