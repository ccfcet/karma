const { readFiles } = require('../lib/utils');
const loadModels = () => {
  let loadedObject = {};
  const models = readFiles(__dirname);
  models.forEach((model) => {
    loadedObject[model] = require(`./${model}`);
  });
  return loadedObject;
};

const loadedModels = loadModels();

module.exports = loadedModels;
