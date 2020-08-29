const Fastify = require('fastify');
const GQL = require('fastify-gql');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs, resolvers } = require('./graphql2');
const { peopleOfEntityLoader } = require('./dataLoaders.js');

const app = Fastify();

// console.log(rootTypeDef);

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
