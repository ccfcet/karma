'use strict'

module.exports = function (sequelize, DataTypes) {
  var FacultyClassAdvisoryActivity = sequelize.define('faculty_class_advisory_activity', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    class_id: {
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

  FacultyClassAdvisoryActivity.associate = function (models) {
    models.Faculty.faculty_class_advisory_activity.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })

    models.Faculty.faculty_class_advisory_activity.belongsTo(models.Academics.classes, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'class_id'
        // allowNull: false -- already defined
      }
    })
  }

  return FacultyClassAdvisoryActivity
}
