'use strict'

module.exports = function (sequelize, DataTypes) {
  var mediaRoles = sequelize.define('media_roles', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role_slug: {
      type: DataTypes.STRING(63),
      allowNull: false
    },
    role_description: {
      type: DataTypes.STRING(2047),
      allowNull: false
    }
  })

  return mediaRoles
}
