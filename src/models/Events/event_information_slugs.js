'use strict'

module.exports = function (sequelize, DataTypes) {
  var eventInformationSlugs = sequelize.define('event_information_slugs', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },

    slug_name: {
      type: DataTypes.VARCHAR(45),
      allowNull: false
    }
  })



  return eventInformationSlugs
}
