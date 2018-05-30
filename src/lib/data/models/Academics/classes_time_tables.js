'use strict'

module.exports = function (sequelize, DataTypes) {
  var ClassesTimeTables = sequelize.define('classes_time_tables', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    class_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    day: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    time_slot_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }
  })

  ClassesTimeTables.associate = function (models) {
    models.Academics.classes_time_tables.belongsTo(models.Academics.classes, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'class_id'
        // allowNull: false -- already defined
      }
    })

    models.Academics.classes_time_tables.belongsTo(models.Academics.time_slots, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'time_slot_id'
        // allowNull: false -- already defined
      }
    })

    models.Academics.classes_time_tables.belongsTo(models.Academics.courses_offered, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'course_id'
        // allowNull: false -- already defined
      }
    })
  }

  return ClassesTimeTables
}
