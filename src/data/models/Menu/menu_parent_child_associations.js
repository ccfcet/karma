'use strict'

module.exports = function (sequelize, DataTypes) {
  var MenuParentChildAssociations = sequelize.define('menu_parent_child_associations', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    parent_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    child_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }
  })
  MenuParentChildAssociations.associate = function (models) {
    models.Menu.menu_parent_child_associations.belongsTo(models.Menu.menu_elements, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'parent_id'
        // allowNull: false -- already defined
      }
    })
    models.Menu.menu_parent_child_associations.belongsTo(models.Menu.menu_elements, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'child_id'
        // allowNull: false -- already defined
      }
    })
  }

  return MenuParentChildAssociations
}
