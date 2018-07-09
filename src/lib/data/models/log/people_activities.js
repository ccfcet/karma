module.exports = function (sequelize, DataTypes) {
  const PeopleActivities = sequelize.define('people_activities', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    activity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    activity_slug: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true,
    },
    activity_description: {
      type: DataTypes.STRING(2047),
      allowNull: false,
    },
  });

  return PeopleActivities;
};
