"use strict";

module.exports = function(sequelize, DataTypes) {
  var EntityInformation = sequelize.define("entityInformation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    entity_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    },
    entity_slug_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT('medium'),
      unique: false,
      allowNull: false
    }
  });

  EntityInformation.associate = function (models) {
    models.entityInformation.belongsTo(models.entities, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "entity_id"
        // allowNull: false -- already defined
      }
    });

    models.entityInformation.belongsTo(models.entitySlugs, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "entity_slug_id"
        // allowNull: false -- already defined
      }
    });
  };

  return EntityInformation;
}
