const { generateLoaders } = require('../../lib/utils');
const tableNames = require('../../constants/tableNames');

const relations = [
  {
    loaderName: 'addressStateLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.address,
      column: `${tableNames.address}.${tableNames.state}`,
    },
    to: {
      table: `${tableNames.state}`,
      column: `${tableNames.state}.id`,
    },
  },
  {
    loaderName: 'addressCountryLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.address,
      column: `${tableNames.address}.${tableNames.country}`,
    },
    to: {
      table: `${tableNames.country}`,
      column: `${tableNames.country}.id`,
    },
  },
];

const loaders = generateLoaders(relations);

module.exports = loaders;
