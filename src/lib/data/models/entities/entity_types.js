module.exports = function (sequelize, DataTypes) {
  const EntityTypes = sequelize.define('entity_types', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    entity_type: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true,
    },
    entity_type_slug: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true,
    },
  });

  return EntityTypes;
};
