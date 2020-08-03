const { Model } = require('objection');
const tableNames = require('../constants/tableNames');

class CourseInstance extends Model {
  static get tableName() {
    return tableNames.course_instance;
  }

  static get relationMappings() {
    const Course = require('./Course');
    const Entity = require('./Entity');
    const AcademicDuration = require('./AcademicDuration');
    const CourseInstanceAssociation = require('./CourseInstanceAssociation');

    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: Course,
        join: {
          from: `${tableNames.course_instance}.${tableNames.course}_id`,
          to: `${tableNames.course}.id`,
        },
      },
      entity: {
        relation: Model.BelongsToOneRelation,
        modelClass: Entity,
        join: {
          from: `${tableNames.course_instance}.${tableNames.entity}_id`,
          to: `${tableNames.entity}.id`,
        },
      },
      academic_duration: {
        relation: Model.BelongsToOneRelation,
        modelClass: AcademicDuration,
        join: {
          from: `${tableNames.course_instance}.${tableNames.academic_duration}_id`,
          to: `${tableNames.academic_duration}.id`,
        },
      },
      course_instance_association: {
        relation: Model.HasManyRelation,
        modelClass: CourseInstanceAssociation,
        join: {
          from: `${tableNames.course_instance}.id`,
          to: `${tableNames.course_instance_association}.${tableNames.course_instance}_id`,
        },
      },
    };
  }
}

module.exports = CourseInstance;
