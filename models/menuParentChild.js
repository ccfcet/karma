"use strict";

module.exports = function(sequelize, DataTypes) {
  var MenuParentChild = sequelize.define("menuParentChild", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    childID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.menuParentChild.belongsTo(models.menuData, { foreignKey: {
          name: 'parentID',
          allowNull: false
        },
        targetKey: 'id' });

        models.menuParentChild.belongsTo(models.menuData, { foreignKey: {
          name: 'childID',
          allowNull: false
        },
        targetKey: 'id' });
      }
    }

  }
);

return MenuParentChild;
}
