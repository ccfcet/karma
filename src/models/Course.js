const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class Course extends Model {
  static get tableName() {
    return tableNames.course;
  }

  static get relationMappings() {
    const CourseInstance = require('./CourseInstance');

    return {
      course_instance: {
        relation: Model.HasManyRelation,
        modelClass: CourseInstance,
        join: {
          from: `${tableNames.course}.id`,
          to: `${tableNames.course_instance}.${tableNames.course}_id`,
        },
      },
    };
  }
}

module.exports = Course;
