const path = require('path');
const fs = require('fs');
const connection = require('../db/db');
const { groupBy } = require('lodash');
const { v4 } = require('uuid');
const { ValidationError } = require('yup');

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

const formatValidationError = (err, errorCode, errorId) => {
  let fieldErrors = [];
  let errorMessages = {};
  err.inner.forEach((e) => {
    if (errorMessages[e.path] === undefined) {
      errorMessages[e.path] = [e.message];
    } else {
      errorMessages[e.path].push(e.message);
    }
  });
  const fieldEntries = Object.entries(errorMessages);
  fieldEntries.forEach(([field, errors]) => {
    fieldErrors.push({
      field,
      errors,
    });
  });
  return {
    error_code: errorCode + '_VALIDATION',
    error_id: errorId,
    fields: fieldErrors,
  };
};

const handleError = (err, errorCode) => {
  let errorId = v4();
  err.errorId = errorId;
  console.log(err);
  if (err instanceof ValidationError) {
    return formatValidationError(err, errorCode, errorId);
  }
  return {
    error_code: errorCode + '_UNKNOWN',
    error_id: errorId,
  };
};

const checkExist = (validator, name, table, invert = false, column = 'id') => {
  const message = invert ? ' already exists.' : " doesn't exist";
  return validator.test(name, '${path}' + message, async function (value) {
    if (value === undefined) return true;
    const result = await connection(table)
      .select()
      .where(`${table}.${column}`, value);
    const expectedValue = invert ? 0 : 1;
    return typeof result !== 'undefined' && result.length === expectedValue;
  });
};

module.exports = {
  readFiles,
  generateLoader,
  generateLoaders,
  formatValidationError,
  handleError,
  checkExist,
};
