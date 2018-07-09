module.exports = function (sequelize, DataTypes) {
  const Media = sequelize.define('media', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    media_title: {
      type: DataTypes.STRING(63),
      allowNull: true,
    },
    media_file_name: {
      type: DataTypes.STRING(2047),
      allowNull: false,
    },
    media_location: {
      type: DataTypes.STRING(2047),
      allowNull: false,
    },
  });

  return Media;
};
