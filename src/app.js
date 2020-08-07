const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { ApolloServer } = require('apollo-server-express');
const { rootTypeDef, rootResolver, rootLoader } = require('./graphql');

const app = express();

const routes = require('./routes');

require('./db/db');

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());

// Routes
app.use('/', routes);

const server = new ApolloServer({
  typeDefs: rootTypeDef,
  resolvers: rootResolver,
  context: () => {
    return {
      ...rootLoader,
    };
  },
});

server.applyMiddleware({ app });

module.exports = app;
