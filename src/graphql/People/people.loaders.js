const { generateLoaders } = require('../../lib/utils');
const { groupBy } = require('lodash');
const tableNames = require('../../constants/tableNames');
const DataLoader = require('dataloader');
const connection = require('../../db/db');

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

// Custom loader for People-CourseInstance
loaders.peopleCourseInstanceLoader = new DataLoader(async (peopleIDs) => {
  const result = await connection(tableNames.course_instance_association)
    .select(
      `${tableNames.course_instance_association}.*`,
      `${tableNames.course_instance_association}.id AS b_id`,
      `${tableNames.course_instance}.*`
    )
    .join(
      tableNames.course_instance,
      `${tableNames.course_instance_association}.${tableNames.course_instance}_id`,
      `${tableNames.course_instance}.id`
    )
    .whereIn(
      `${tableNames.course_instance_association}.${tableNames.people}_id`,
      peopleIDs
    );
  let objectMap = groupBy(result, 'people_id');
  return peopleIDs.map((peopleID) => objectMap[peopleID]);
});

// Custom loader for People-Address
loaders.peopleAddressLoader = new DataLoader(async (peopleIDs) => {
  const result = await connection(tableNames.people_address)
    .select(
      `${tableNames.people_address}.id AS a_id`,
      `${tableNames.people_address}.${tableNames.people}_id`,
      `${tableNames.address}.*`
    )
    .join(
      tableNames.address,
      `${tableNames.people_address}.${tableNames.address}_id`,
      `${tableNames.address}.id`
    )
    .whereIn(`${tableNames.people_address}.${tableNames.people}_id`, peopleIDs);

  let objectMap = groupBy(result, 'people_id');
  return peopleIDs.map((peopleID) => objectMap[peopleID]);
});

module.exports = loaders;
