module.exports = function (sequelize, DataTypes) {
  const MenuElements = sequelize.define('menu_elements', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    menu_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    item_url: {
      type: DataTypes.STRING(1023),
      allowNull: false,
    },
  });
  MenuElements.associate = function (models) {
    models.menu.menu_elements.belongsTo(models.menu.menu_data, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'menu_id',
        // allowNull: false -- already defined
      },
    });
  };

  return MenuElements;
};
