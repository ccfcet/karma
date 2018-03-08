'use strict'

module.exports = function (sequelize, DataTypes) {
  var mediaRoleEntityAssociation = sequelize.define('media_role_entity_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    media_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    entity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    created_at {
      type: DataTypes.TIME(),
      allowNull: false
    },
    updated_at {
      type: DataTypes.TIME(),
      allowNull: false
    }

  })

  mediaRoleEntityAssociation.associate = function (models) {
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

  return FacultyAcademicEnrolmentActivity
}
