module.exports = function (sequelize, DataTypes) {
  const Events = sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  return Events;
};
