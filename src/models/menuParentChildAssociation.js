"use strict";

module.exports = function(sequelize, DataTypes) {
  var MenuParentChildAssociation = sequelize.define("menuParentChildAssociation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parent_element_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    },
    child_element_id: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
      allowNull: false
    }
  });

  MenuParentChildAssociation.associate = function (models) {
    models.menuParentChildAssociation.belongsTo(models.menuData, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "parent_element_id"
        // allowNull: false -- already defined
      }
    });

    models.menuParentChildAssociation.belongsTo(models.menuData, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "child_element_id"
        // allowNull: false -- already defined
      }
    });
  };

  return MenuParentChildAssociation;
}
