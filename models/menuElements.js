"use strict";

module.exports = function(sequelize, DataTypes) {
  var MenuElements = sequelize.define("menuElements", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    }
    position: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING(100),
      unique: false,
      allowNull: false
    },
    itemUrl: {
      type: DataTypes.STRING(1023),
      unique: false,
      allowNull: false
    }
  });

  MenuElements.associate = function (models) {
    models.menuElements.belongsTo(models.menuData, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "menu_id"
        // allowNull: false -- already defined
      }
    });
  });

  return MenuElements;
}
