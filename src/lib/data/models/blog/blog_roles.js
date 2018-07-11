module.exports = function (sequelize, DataTypes) {
  const BlogRoles = sequelize.define('blog_roles', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_slug: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    role_description: {
      type: DataTypes.STRING(2048),
    },
  });

  return BlogRoles;
};
