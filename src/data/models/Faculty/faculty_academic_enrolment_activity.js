'use strict'

module.exports = function (sequelize, DataTypes) {
  var FacultyAcademicEnrolmentActivity = sequelize.define('faculty_academic_enrolment_activity', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    activity: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    date_time: {
      type: DataTypes.DATE(),
      allowNull: false
    }
  })

  FacultyAcademicEnrolmentActivity.associate = function (models) {
    models.Faculty.faculty_class_advisory_activity.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })

    models.Faculty.faculty_class_advisory_activity.belongsTo(models.Academics.courses_offered, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'course_id'
        // allowNull: false -- already defined
      }
    })
  }

  return FacultyAcademicEnrolmentActivity
}
