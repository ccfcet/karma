'use strict'

module.exports = function (sequelize, DataTypes) {
  var events = sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.VARCHAR(255),
      allowNull: false
    }
  })



  return events
}
