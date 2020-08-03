const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class EntityTypeField extends Model {
  static get tableName() {
    return tableNames.entity_type_field;
  }

  static get relationMappings() {
    const EntityType = require('./EntityType');
    const Field = require('./Field');
    return {
      entity_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: EntityType,
        join: {
          from: `${tableNames.entity_type_field}.${tableNames.entity_type}_id`,
          to: `${tableNames.entity_type}.id`,
        },
      },
      field: {
        relation: Model.BelongsToOneRelation,
        modelClass: Field,
        join: {
          from: `${tableNames.entity_type_field}.${tableNames.field}_id`,
          to: `${tableNames.field}.id`,
        },
      },
    };
  }
}

module.exports = EntityTypeField;
