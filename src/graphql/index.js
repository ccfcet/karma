const path = require('path');
const {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
} = require('graphql-tools');

// Load Schema
const typesArray = loadFilesSync(path.join(__dirname, '.'), {
  extensions: ['gql'],
  recursive: true,
});

// Load Resolvers
const resolversArray = loadFilesSync(
  path.join(__dirname, './**/*.resolvers.*')
);

// Load Loaders
const loadersArray = loadFilesSync(path.join(__dirname, './**/*.loaders.*'));

module.exports = {
  typeDefs: mergeTypeDefs(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
  loaders: mergeResolvers(loadersArray),
};
