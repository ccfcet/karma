const path = require('path');
const fs = require('fs');
const DataLoader = require('dataloader');
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

const generateLoader = ({ type, from, via, to }) => {
  return async (batchIds) => {
    const qb = connection(from.table);
    let results;
    let objectMap;
    let returnResult;
    switch (type) {
      case 'many-to-many':
        qb.select([
          `${from.table}.id AS ${from.table}_id`,
          `${to.table}.*`,
          `${via.table}.*`,
        ])
          .join(via.table, from.column, via.column1)
          .join(to.table, to.column, via.column2);
        results = await qb;
        objectMap = groupBy(results, `${from.table}_id`);
        returnResult = batchIds.map((batchId) => objectMap[batchId]);
        break;

      case 'many-to-many-children':
        qb.select([
          `${from.table}.id AS ${from.table}_id`,
          `${via.table}.*`,
        ]).join(via.table, from.column, via.column1);
        returnResult = batchIds.map((batchId) => objectMap[batchId]);
        break;
      case 'many-to-one':
        qb.select([
          `${from.table}.id AS ${from.table}_id`,
          `${to.table}.*`,
        ]).join(to.table, from.column, to.column);
        results = await qb;
        objectMap = groupBy(results, `${from.table}_id`);
        returnResult = batchIds.map((batchId) => objectMap[batchId][0]);
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
    loaders = {
      ...loaders,
      [option.loaderName]: new DataLoader(generateLoader(option)),
    };
  });
  return loaders;
};

module.exports = {
  readFiles,
  generateLoader,
  generateLoaders,
};
