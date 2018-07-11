module.exports = function (sequelize, DataTypes) {
  const MenuData = sequelize.define('menu_data', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    entity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    menu_type: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    menu_title: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  });
  MenuData.associate = function (models) {
    models.menu.menu_data.belongsTo(models.entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_id',
        // allowNull: false -- already defined
      },
    });
  };

  return MenuData;
};
