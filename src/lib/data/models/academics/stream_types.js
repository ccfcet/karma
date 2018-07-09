module.exports = function (sequelize, DataTypes) {
  const StreamTypes = sequelize.define('stream_types', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    stream_type_long: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    stream_type_short: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  });

  return StreamTypes;
};
