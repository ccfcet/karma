const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Field extends Model {
  static get tableName() {
    return tableNames.field;
  }

  static get relationMappings() {
    const DataType = require('./DataType');
    const People = require('./People');
    const EntityType = require('./EntityType');
    const PeopleFieldValue = require('./PeopleFieldValue');
    const EntityFieldValue = require('./EntityFieldValue');

    return {
      data_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: DataType,
        join: {
          from: `${tableNames.field}.${tableNames.data_type}_id`,
          to: `${tableNames.data_type}.id`,
        },
      },
      people: {
        relation: Model.ManyToManyRelation,
        modelClass: People,
        join: {
          from: `${tableNames.field}.id`,
          through: {
            from: `${tableNames.people_field_value}.${tableNames.field}_id`,
            to: `${tableNames.people_field_value}.${tableNames.people}_id`,
          },
          to: `${tableNames.people}.id`,
        },
      },
      entity_type: {
        relation: Model.ManyToManyRelation,
        modelClass: EntityType,
        join: {
          from: `${tableNames.field}.id`,
          through: {
            from: `${tableNames.entity_type_field}.${tableNames.field}_id`,
            to: `${tableNames.entity_type_field}.${tableNames.entity_type}_id`,
          },
          to: `${tableNames.entity_type}.id`,
        },
      },
      people_field_value: {
        relation: Model.HasManyRelation,
        modelClass: PeopleFieldValue,
        join: {
          from: `${tableNames.field}.id`,
          to: `${tableNames.people_field_value}.${tableNames.field}_id`,
        },
      },
      entity_field_value: {
        relation: Model.HasManyRelation,
        modelClass: EntityFieldValue,
        join: {
          from: `${tableNames.field}.id`,
          to: `${tableNames.entity_field_value}.${tableNames.field}_id`,
        },
      },
    };
  }
}

module.exports = Field;
