const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class AcademicDuration extends Model {
  static get tableName() {
    return tableNames.academic_duration;
  }

  static get relationMappings() {
    const CourseInstance = require('./CourseInstance');

    return {
      course_instance: {
        relation: Model.HasManyRelation,
        modelClass: CourseInstance,
        join: {
          from: `${tableNames.academic_duration}.id`,
          to: `${tableNames.course_instance}.${tableNames.academic_duration}_id`,
        },
      },
    };
  }
}

module.exports = AcademicDuration;
