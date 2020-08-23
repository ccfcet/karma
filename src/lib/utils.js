const path = require('path');
const fs = require('fs');
const DataLoader = require('dataloader');
const connection = require('../db/db');

const readFiles = (dir) => {
  const directoryPath = path.join(dir, '.');
  const filenames = fs.readdirSync(directoryPath);
  let outputFiles = filenames.map((filename) => {
    return filename.split('.')[0];
  });
  outputFiles = outputFiles.filter((filename) => filename !== 'index');
  return outputFiles;
};

const generateLoader = ({ loaderName, type, from, via, to, cache = true }) => {
  return new DataLoader(
    async (batchIds) => {
      console.log('LOADER CREATED FOR', loaderName);
      const qb = connection(from.table);
      let results;
      let objectMap;
      let returnResult;
      switch (type) {
        case 'many-to-many':
          console.log('HEEEEEEE');
          qb.select([
            `${from.table}.id AS ${from.table}_id`,
            `${to.table}.*`,
            `${via.table}.*`,
          ])
            .join(via.table, from.column, via.column1)
            .join(to.table, to.column, via.column2);
          results = await qb;
          objectMap = {};
          results.forEach((result) => {
            const index = result[`${from.table}_id`];
            if (objectMap[index]) {
              // console.log('111');
              objectMap[index].push(result);
            } else {
              // console.log('222');
              objectMap[index] = [result];
            }
          });
          console.log(objectMap);
          returnResult = batchIds.map((batchId) => objectMap[batchId]);
          console.log(returnResult);
          break;
        default:
          qb.select([
            `${from.table}.id AS ${from.table}_id`,
            `${to.table}.*`,
          ]).join(to.table, from.column, to.column);
          results = await qb;
          objectMap = {};
          results.forEach((result) => {
            objectMap[result[`${from.table}_id`]] = result;
          });
          console.log(objectMap);
          returnResult = batchIds.map((batchId) => objectMap[batchId]);
          console.log(returnResult);
      }
      return returnResult;
    },
    { cache }
  );
};

module.exports = {
  readFiles,
  generateLoader,
};
