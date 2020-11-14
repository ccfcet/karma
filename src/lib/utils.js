const path = require('path');
const fs = require('fs');
const connection = require('../db/db');
const { groupBy } = require('lodash');

const readFiles = (dir) => {
  const directoryPath = path.join(dir, '.');
  const filenames = fs.readdirSync(directoryPath);
  let outputFiles = filenames.map((filename) => {
    return filename.split('.')[0];
  });
  outputFiles = outputFiles.filter((filename) => filename !== 'index');
  return outputFiles;
};

const generateLoader = ({ type, from, to }) => {
  return async (batchIds) => {
    const qb = connection(from.table);
    let results;
    let objectMap;
    let returnResult;
    switch (type) {
      case 'many-to-one':
        qb.select([`${from.table}.id AS ${from.table}_id`, `${to.table}.*`])
          .join(to.table, from.column, to.column)
          .whereIn(`${from.table}.id`, batchIds);
        results = await qb;
        objectMap = groupBy(results, `${from.table}_id`);

        returnResult = batchIds.map((batchId) => objectMap[batchId][0]);
        break;

      case 'one-to-many':
        results = await qb;
        objectMap = groupBy(results, `${to.table}_id`);
        returnResult = batchIds.map((batchId) => objectMap[batchId]);
        break;

      default:
        throw new Error('Wrong relation type!');
    }
    return returnResult;
  };
};

const generateLoaders = (options) => {
  let loaders = {};
  options.forEach((option) => {
    // loaders = {
    //   ...loaders,
    //   [option.loaderName]: new DataLoader(generateLoader(option)),
    // };
    loaders[option.loaderName] = generateLoader(option);
  });
  return loaders;
};

module.exports = {
  readFiles,
  generateLoader,
  generateLoaders,
};
