const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class EntityType extends Model {
  static get tableName() {
    return tableNames.entity_type;
  }

  static get relationMappings() {
    const Entity = require('./Entity');
    const Field = require('./Field');

    return {
      entity: {
        relation: Model.HasManyRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.entity_type}.id`,
          to: `${tableNames.entity}.${tableNames.entity_type}_id`,
        },
      },
      field: {
        relation: Model.ManyToManyRelation,
        modelClass: Field,
        join: {
          from: `${tableNames.entity_type}.id`,
          through: {
            from: `${tableNames.entity_type_field}.${tableNames.entity_type}_id`,
            to: `${tableNames.entity_type_field}.${tableNames.field}_id`,
          },
          to: `${tableNames.field}.id`,
        },
      },
    };
  }
}

module.exports = EntityType;
