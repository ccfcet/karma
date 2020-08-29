const path = require('path');
const {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
} = require('graphql-tools');

// LOAD SCHEMA
const typesArray = loadFilesSync(path.join(__dirname, '.'), {
  extensions: ['gql'],
  recursive: true,
});
// LOAD RESOLVERS
const resolversArray = loadFilesSync(
  path.join(__dirname, './**/*.resolvers.*')
);

module.exports = {
  typeDefs: mergeTypeDefs(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
};

//  FOR USE IN PRODUCTION
// const printedTypeDefs = print(typeDefs);
// fs.writeFileSync('joined.graphql', printedTypeDefs);
