const { generateLoaders } = require('../../lib/utils');
const tableNames = require('../../constants/tableNames');

const relations = [
  {
    loaderName: 'stateCountryLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.state,
      column: `${tableNames.state}.${tableNames.country}_id`,
    },
    to: {
      table: tableNames.country,
      column: `${tableNames.country}.id`,
    },
  },
];

const loaders = generateLoaders(relations);

module.exports = loaders;
