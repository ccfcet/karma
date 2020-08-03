const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class CourseInstanceAssociation extends Model {
  static get tableName() {
    return tableNames.course_instance_association;
  }

  static get relationMappings() {
    const CourseInstance = require('./CourseInstance');
    const People = require('./People');

    return {
      course_instance: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseInstance,
        join: {
          from: `${tableNames.course_instance_association}.${tableNames.course_instance}_id`,
          to: `${tableNames.course_instance}.id`,
        },
      },
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.course_instance_association}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
    };
  }
}

module.exports = CourseInstanceAssociation;
