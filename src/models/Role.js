const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Role extends Model {
  static get tableName() {
    return tableNames.role;
  }

  static get relationMappings() {
    const CourseInstanceAssociation = require('./CourseInstanceAssociation');
    const People = require('./People');

    return {
      course_instance_association: {
        relation: Model.HasManyRelation,
        modelClass: CourseInstanceAssociation,
        join: {
          from: `${tableNames.role}.id`,
          to: `${tableNames.course_instance_association}.${tableNames.role}_id`,
        },
      },
      people: {
        relation: Model.ManyToManyRelation,
        modelClass: People,
        join: {
          from: `${tableNames.role}.id`,
          through: {
            from: `${tableNames.role_people_entity}.${tableNames.role}_id`,
            to: `${tableNames.role_people_entity}.${tableNames.people}_id`,
          },
          to: `${tableNames.people}.id`,
        },
      },
    };
  }
}

module.exports = Role;
