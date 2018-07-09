module.exports = function (sequelize, DataTypes) {
  const MediaRoles = sequelize.define('media_roles', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    role_slug: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true,
    },
    role_description: {
      type: DataTypes.STRING(2047),
      allowNull: true,
    },
  });

  return MediaRoles;
};
