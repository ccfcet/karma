module.exports = function (sequelize, DataTypes) {
  const PeopleInformationSlugs = sequelize.define('people_information_slugs', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    slug_name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
  });

  return PeopleInformationSlugs;
};
