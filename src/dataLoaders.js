const DataLoader = require('dataloader');
const connection = require('./db/db');
const _ = require('lodash');

const batchSuggestions = async (peopleIDs) => {
  const result = await connection('people').whereIn('id', peopleIDs);
  const gs = _.groupBy(result, 'id');
  return peopleIDs.map((peopleID) => gs[peopleID]);
};

const peopleOfEntityLoader = new DataLoader((peopleIDs) =>
  batchSuggestions(peopleIDs)
);

module.exports = {
  peopleOfEntityLoader,
};
