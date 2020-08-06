const { merge } = require('lodash');
const { gql } = require('apollo-server-express');
const { readFiles } = require('../lib/utils');

const loadModules = () => {
  let loadedSchema = [];
  let loadedResolvers = {};
  const modules = readFiles(__dirname);
  modules.forEach((_module) => {
    const loadedModule = require(`./${_module}`);
    loadedSchema.push(loadedModule.typeDefs);
    loadedResolvers = merge(loadedResolvers, loadedModule.resolvers);
  });
  return { loadedSchema, loadedResolvers };
};

// const Nationality = require('./Nationality');
// const Country = require('./Country');

const Query = gql`
  type Query {
    _empty: String
  }
`;

const { loadedSchema, loadedResolvers } = loadModules();

const rootTypeDef = loadedSchema;
rootTypeDef.push(Query);

const rootResolver = loadedResolvers;
// const rootTypeDef = [Query, Nationality.typeDefs, Country.typeDefs];
// const rootResolver = merge(Nationality.resolvers, Country.resolvers);

module.exports = {
  rootTypeDef,
  rootResolver,
};
