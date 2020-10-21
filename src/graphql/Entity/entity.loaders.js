const { generateLoaders } = require('../../lib/utils');
const { groupBy } = require('lodash');
const tableNames = require('../../constants/tableNames');
const DataLoader = require('dataloader');
const connection = require('../../db/db');

const relations = [
  {
    loaderName: 'entityEntityTypeLoader',
    type: 'many-to-one',
    from: {
      table: `${tableNames.entity}`,
      column: `${tableNames.entity}.${tableNames.entity_type}_id`,
    },
    to: {
      table: `${tableNames.entity_type}`,
      column: `${tableNames.entity_type}.id`,
    },
  },
];

let loaders = generateLoaders(relations);

// Custom loader for Entity-Children.
loaders.entityChildrenLoader = new DataLoader(async (entityIDs) => {
  const result = await connection(tableNames.entity_parent_child)
    .select(
      `${tableNames.entity_parent_child}.id AS b_id`,
      `${tableNames.entity_parent_child}.*`,
      `${tableNames.entity}.*`
    )
    .join(
      tableNames.entity,
      `${tableNames.entity_parent_child}.child_id`,
      `${tableNames.entity}.id`
    )
    .whereIn(`${tableNames.entity_parent_child}.parent_id`, entityIDs);
  let objectMap = groupBy(result, 'parent_id');
  return entityIDs.map((entityID) => objectMap[entityID]);
});

module.exports = loaders;
