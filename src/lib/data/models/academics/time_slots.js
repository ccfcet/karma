module.exports = function (sequelize, DataTypes) {
  const TimeSlots = sequelize.define('time_slots', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    start_timestamp: {
      type: DataTypes.TIME(),
      allowNull: false,
    },
    end_timestamp: {
      type: DataTypes.TIME(),
      allowNull: false,
    },
  });

  return TimeSlots;
};
