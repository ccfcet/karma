"use strict";

module.exports = function(sequelize, DataTypes) {
  var MenuData = sequelize.define("menuData", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    menuType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    itemUrl: {
      type: DataTypes.STRING(320),
      unique: true,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.menuData.belongsTo(models.entities, { foreignKey: {
          name: 'entityEid',
          allowNull: false
        } });
      }
    }

  }
);

return MenuData;
}
