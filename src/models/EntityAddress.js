const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class EntityAddress extends Model {
  static get tableName() {
    return tableNames.people_address;
  }

  static get relationMappings() {
    const Entity = require('./Entity');
    const Address = require('./Address');
    const DataType = require('./DataType');

    return {
      entity: {
        relation: Model.BelongsToOneRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.entity_address}.${tableNames.entity}_id`,
          to: `${tableNames.entity}.id`,
        },
      },
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: `${tableNames.entity_address}.${tableNames.address}_id`,
          to: `${tableNames.address}.id`,
        },
      },
      data_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: DataType,
        join: {
          from: `${tableNames.entity_address}.${tableNames.data_type}_id`,
          to: `${tableNames.data_type}.id`,
        },
      },
    };
  }
}

module.exports = EntityAddress;
