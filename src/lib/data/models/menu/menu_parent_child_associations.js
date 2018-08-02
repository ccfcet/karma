module.exports = function (sequelize, DataTypes) {
  const MenuParentChildAssociations = sequelize
    .define('menu_parent_child_associations', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        compositeIndex: true,
      },
      child_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        compositeIndex: true,
      },
    });

  MenuParentChildAssociations.associate = function (models) {
    models.menu.menu_parent_child_associations
      .belongsTo(models.menu.menu_elements, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'parent_id',
        // allowNull: false -- already defined
        },
      });

    models.menu.menu_parent_child_associations
      .belongsTo(models.menu.menu_elements, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'child_id',
        // allowNull: false -- already defined
        },
      });
  };

  return MenuParentChildAssociations;
};
