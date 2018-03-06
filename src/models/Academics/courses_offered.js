'use strict'

module.exports = function (sequelize, DataTypes) {
  var CoursesOffered = sequelize.define('courses_offered', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    }
    official_course_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true
    },
    credits: {
      type: DataTypes.INTEGER(),
      autoIncrement: true
    },
    valid_start_date: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    valid_end_date: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    duration_in_days:{
      type: DataTypes.INTEGER(),
      autoIncrement: true
    }


  })

  CoursesOffered.associate = function (models) {
    models.Academics.courses_offered.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })

  }

  return CoursesOffered
}
