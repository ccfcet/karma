const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class EntityFieldValue extends Model {
  static get tableName() {
    return tableNames.entity_field_value;
  }

  static get relationMappings() {
    const Entity = require('./Entity');
    const Field = require('./Field');

    return {
      entity: {
        relation: Model.BelongsToOneRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.entity_field_value}.${tableNames.entity}_id`,
          to: `${tableNames.entity}.id`,
        },
      },
      field: {
        relation: Model.BelongsToOneRelation,
        modelClass: Field,
        join: {
          from: `${tableNames.entity_field_value}.${tableNames.field}_id`,
          to: `${tableNames.field}.id`,
        },
      },
    };
  }
}

module.exports = EntityFieldValue;
