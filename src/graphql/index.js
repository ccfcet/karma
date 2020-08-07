const { merge } = require('lodash');
const { gql } = require('apollo-server-express');
const { readFiles } = require('../lib/utils');

const loadModules = () => {
  let loadedSchema = [];
  let loadedResolvers = {};
  let loadedLoaders = {};
  const modules = readFiles(__dirname);
  modules.forEach((_module) => {
    const loadedModule = require(`./${_module}`);
    loadedSchema.push(loadedModule.typeDefs);
    loadedResolvers = merge(loadedResolvers, loadedModule.resolvers);
    loadedLoaders = merge(loadedLoaders, loadedModule.loaders);
  });
  return { loadedSchema, loadedResolvers, loadedLoaders };
};

const Query = gql`
  type Query {
    _empty: String
  }
`;

const { loadedSchema, loadedResolvers, loadedLoaders } = loadModules();

const rootTypeDef = loadedSchema;
rootTypeDef.push(Query);

const rootResolver = loadedResolvers;

const rootLoader = loadedLoaders;

module.exports = {
  rootTypeDef,
  rootResolver,
  rootLoader,
};
