'use strict'

module.exports = function (sequelize, DataTypes) {
  var media_role_people_association = sequelize.define('media_role_people_association', {
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
    created_at:{
      type: DataTypes.TIME(),
      allowNull: false
    },
    updated_at:{
      type: DataTypes.TIME(),
      allowNull: false
    }


  })

  media_role_people_association.associate = function (models) {
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
