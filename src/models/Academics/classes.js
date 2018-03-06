'use strict'

module.exports = function (sequelize, DataTypes) {
  var Classes = sequelize.define('classes', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    current_class_slug: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE(),
      allowNull: false
    }
  })

  return Classes
}
