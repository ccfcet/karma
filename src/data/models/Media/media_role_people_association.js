'use strict'

module.exports = function (sequelize, DataTypes) {
  var mediaRolePeopleAssociation = sequelize.define('media_role_people_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    media_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    role_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    created_at: {
      type: DataTypes.TIME(),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.TIME(),
      allowNull: false
    }

  })

  mediaRolePeopleAssociation.associate = function (models) {
    models.Media.media_role_people_association.belongsTo(models.Media.media_roles, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'role_id'
        // allowNull: false -- already defined
      }
    })
    models.Media.media_role_people_association.belongsTo(models.Media.media, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'media_id'
        // allowNull: false -- already defined
      }
    })
    models.Media.media_role_people_association.belongsTo(models.Media.faculty_academic_enrolment_activity, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id'
        // allowNull: false -- already defined
      }
    })
  }

  return mediaRolePeopleAssociation
}
