const { merge } = require('lodash');
const { gql } = require('apollo-server-express');
const { readFiles } = require('../lib/utils');

const loadModules = () => {
  let loadedSchema = [];
  let loadedResolvers = {};
  // let loadedLoaders = {};
  const modules = readFiles(__dirname);
  modules.forEach((_module) => {
    if (_module === 'peopleNew') return;
    const loadedModule = require(`./${_module}`);
    loadedSchema.push(loadedModule.typeDefs);
    loadedResolvers = merge(loadedResolvers, loadedModule.resolvers);
    // loadedLoaders = merge(loadedLoaders, loadedModule.loaders);
  });
  return { loadedSchema, loadedResolvers };
};

const Query = gql`
  type Query {
    _empty: String
  }
`;

const { loadedSchema, loadedResolvers } = loadModules();

const rootTypeDef = loadedSchema;
rootTypeDef.push(Query);

const rootResolver = loadedResolvers;

module.exports = {
  rootTypeDef,
  rootResolver,
};
