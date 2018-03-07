'use strict'

module.exports = function (sequelize, DataTypes) {
  var Entities = sequelize.define('entities', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    entity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    entity_type_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }
  })

  Entities.associate = function (models) {
    models.Entities.entities.belongsTo(models.Entities.entity_types, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_type_id'
        // allowNull: false -- already defined
      }
    })
  }

  return Entities
}
