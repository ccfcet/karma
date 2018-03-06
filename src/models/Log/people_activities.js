'use strict'

module.exports = function (sequelize, DataTypes) {
  var PeopleActivities = sequelize.define('people_activities', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    activity_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    activity_slug: {
      type: DataTypes.STRING(63),
      allowNull: false
    }
  })

  return PeopleActivities
}
