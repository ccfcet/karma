"use strict";

module.exports = function(sequelize, DataTypes) {
  var MenuData = sequelize.define("menuData", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    entity_id: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    menu_title: {
      type: DataTypes.STRING(255),
      unique: false,
      allowNull: true
    }
  });

  MenuData.associate = function (models) {
    models.menuData.belongsTo(models.entities, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "entity_id"
        // allowNull: false -- already defined
      }
    });
  });

  return MenuData;
}
