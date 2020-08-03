const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class AttendanceData extends Model {
  static get tableName() {
    return tableNames.attendance_data;
  }

  static get relationMappings() {
    const CourseInstance = require('./CourseInstance');
    const People = require('./People');

    return {
      course_instance: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseInstance,
        join: {
          from: `${tableNames.attendance_data}.${tableNames.course_instance}_id`,
          to: `${tableNames.course_instance}.id`,
        },
      },
      people: {
        relation: Model.BelongsToOneRelation,
        modelClass: People,
        join: {
          from: `${tableNames.attendance_data}.${tableNames.people}_id`,
          to: `${tableNames.people}.id`,
        },
      },
    };
  }
}

module.exports = AttendanceData;
