const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { ApolloServer } = require('apollo-server-express');

const { rootTypeDef, rootResolver } = require('./graphql');

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
});

server.applyMiddleware({ app });
console.log(server.graphqlPath);

module.exports = app;
