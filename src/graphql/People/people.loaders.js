const { generateLoaders } = require('../../lib/utils');
const tableNames = require('../../constants/tableNames');

const relations = [
  {
    loaderName: 'peopleNationalityLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.people,
      column: `${tableNames.people}.${tableNames.nationality}_id`,
    },
    to: {
      table: tableNames.nationality,
      column: `${tableNames.nationality}.id`,
    },
  },
  {
    loaderName: 'peopleAddressLoader',
    type: 'many-to-many',
    from: {
      table: tableNames.people,
      column: `${tableNames.people}.id`,
    },
    via: {
      table: tableNames.people_address,
      column1: `${tableNames.people_address}.${tableNames.people}_id`,
      column2: `${tableNames.people_address}.${tableNames.address}_id`,
    },
    to: {
      table: tableNames.address,
      column: `${tableNames.address}.id`,
    },
  },
  {
    loaderName: 'peopleEmailLoader',
    type: 'one-to-many',
    from: {
      table: tableNames.email,
      column: `${tableNames.email}.${tableNames.people}_id`,
    },
    to: {
      table: tableNames.people,
      column: `${tableNames.people}.id`,
    },
  },
];

const loaders = generateLoaders(relations);

module.exports = loaders;
