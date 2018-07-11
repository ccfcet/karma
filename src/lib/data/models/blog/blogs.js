module.exports = function (sequelize, DataTypes) {
  const Blogs = sequelize.define('blogs', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    blog_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    blog_alias_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  return Blogs;
};
