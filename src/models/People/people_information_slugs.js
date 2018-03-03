'use strict'

module.exports = function (sequelize, DataTypes) {
  var PeopleInformationSlugs = sequelize.define('people_information_slugs', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    slug_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  })

  return PeopleInformationSlugs
}
