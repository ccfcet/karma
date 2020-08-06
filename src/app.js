const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { graphqlHTTP } = require('express-graphql');

const { rootSchema, rootResolver } = require('./graphql');

const app = express();

const routes = require('./routes');

require('./db/db');

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());

// Routes
app.use('/', routes);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

module.exports = app;
