module.exports = function (sequelize, DataTypes) {
  const Entities = sequelize.define('entities', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    entity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    entity_slug: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true,
    },
    entity_type_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  Entities.associate = function (models) {
    models.entities.entities.belongsTo(models.entities.entity_types, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_type_id',
        // allowNull: false -- already defined
      },
    });
  };

  return Entities;
};
