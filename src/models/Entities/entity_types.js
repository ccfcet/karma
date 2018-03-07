'use strict'

module.exports = function (sequelize, DataTypes) {
  var EntityTypes = sequelize.define('entity_types', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    entity_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    }

  })

  return EntityTypes
}
