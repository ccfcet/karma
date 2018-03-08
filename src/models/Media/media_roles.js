'use strict'

module.exports = function (sequelize, DataTypes) {
  var mediaRoles = sequelize.define('media_roles', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: DataTypes.VARCHAR(255),
      allowNull: false
    },
    role_slug: {
      type: DataTypes.VARCHAR(45),
      allowNull: false
    },
    role_description: {
      type: DataTypes.VARCHAR(2048),
      allowNull: false
    },
    created_at {
      type: DataTypes.TIME(),
      allowNull: false
    },
    updated_at {
      type: DataTypes.TIME(),
      allowNull: false
    },

  })

  

  return mediaRoles
}
