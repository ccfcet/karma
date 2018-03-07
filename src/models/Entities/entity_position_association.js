'use strict'

module.exports = function (sequelize, DataTypes) {
  var EntityPositionAssociation = sequelize.define('entity_position_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    entity_id: {
      type: DataTypes.INTEGER()
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    position_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    position_slug: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    position_description: {
      type: DataTypes.TEXT(),
      allowNull: false
    }

  })

  EntityPositionAssociation.associate = function (models) {
    models.Entities.entity_position_association.belongsTo(models.Entities.entitie, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_id'
        // allowNull: false -- already defined
      }
    })
  }

  return EntityPositionAssociation
}
