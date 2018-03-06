'use strict'

module.exports = function (sequelize, DataTypes) {
  var StudentClassEnrollmentActivity = sequelize.define('student_class_enrolment_activity', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    clas_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    activity: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }

  })

  StudentClassEnrollmentActivity.associate = function (models) {
    models.Academics.student_class_enrolment_activity.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })

    models.Academics.student_class_enrolment_activity.belongsTo(models.Academics.classes, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'class_id'
        // allowNull: false -- already defined
      }
    })
  }

  return StudentClassEnrollmentActivity
}
