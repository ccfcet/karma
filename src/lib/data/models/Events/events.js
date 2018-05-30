'use strict'

module.exports = function (sequelize, DataTypes) {
  var Events = sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  })

  return Events
}
