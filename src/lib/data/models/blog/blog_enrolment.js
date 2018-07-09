module.exports = function (sequelize, DataTypes) {
  const BlogEnrollment = sequelize.define('blog_enrollment', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    activity: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
  });

  BlogEnrollment.associate = function (models) {
    models.blog.blog_enrollment.belongsTo(models.blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id',
        // allowNull: false -- already defined
      },
    });
  };

  return BlogEnrollment;
};
