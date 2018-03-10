'use strict'

module.exports = function (sequelize, DataTypes) {
  var MediaRoleEntityAssociation = sequelize.define('media_role_entity_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    media_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex'
    },
    role_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex'
    },
    entity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex'
    }
    // implement [index6 specified in db design] compositeIndex when sequelize supports it.
    // https://github.com/sequelize/sequelize/issues/8148
  })

  MediaRoleEntityAssociation.associate = function (models) {
    models.Media.media_role_entity_association.belongsTo(models.Media.media, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'media_id'
        // allowNull: false -- already defined
      }
    })
    models.Media.media_role_entity_association.belongsTo(models.Media.media_roles, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'role_id'
        // allowNull: false -- already defined
      }
    })
    models.Media.media_role_entity_association.belongsTo(models.Entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_id'
        // allowNull: false -- already defined
      }
    })
  }

  return MediaRoleEntityAssociation
}
