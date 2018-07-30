module.exports = function (sequelize, DataTypes) {
  const EntityInformationSlugs = sequelize.define('entity_information_slugs', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    slug_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
  });

  return EntityInformationSlugs;
};
