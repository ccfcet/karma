const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Entity extends Model {
  static get tableName() {
    return tableNames.entity;
  }

  static get relationMappings() {
    const EntityType = require('./EntityType');
    const EntityFieldValue = require('./EntityFieldValue');
    const Address = require('./Address');
    const CourseInstance = require('./CourseInstance');

    return {
      entity_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: EntityType,
        join: {
          from: `${tableNames.entity}.${tableNames.entity_type}_id`,
          to: `${tableNames.entity_type}.id`,
        },
      },
      entity_field_value: {
        relation: Model.HasManyRelation,
        modelClass: EntityFieldValue,
        join: {
          from: `${tableNames.entity}.id`,
          to: `${tableNames.entity_entity_value}.${tableNames.field}_id`,
        },
      },
      address: {
        relation: Model.ManyToManyRelation,
        modelClass: Address,
        join: {
          from: `${tableNames.entity}.id`,
          through: {
            from: `${tableNames.entity_address}.${tableNames.entity}_id`,
            to: `${tableNames.entity_address}.${tableNames.address}_id`,
          },
          to: `${tableNames.address}.id`,
        },
      },
      parent: {
        relation: Model.ManyToManyRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.entity}.id`,
          through: {
            from: `${tableNames.entity_parent_child}.child_id`,
            to: `${tableNames.entity_parent_child}.parent_id`,
          },
          to: `${tableNames.entity}.id`,
        },
      },
      child: {
        relation: Model.ManyToManyRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.entity}.id`,
          through: {
            from: `${tableNames.entity_parent_child}.parent_id`,
            to: `${tableNames.entity_parent_child}.child_id`,
          },
          to: `${tableNames.entity}.id`,
        },
      },
      course_instance: {
        relation: Model.HasManyRelation,
        modelClass: CourseInstance,
        join: {
          from: `${tableNames.entity}.id`,
          to: `${tableNames.course_instance}.${tableNames.entity}_id`,
        },
      },
    };
  }
}

module.exports = Entity;
