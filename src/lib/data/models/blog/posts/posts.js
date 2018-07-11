module.exports = function (sequelize, DataTypes) {
  const Posts = sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING(2047),
      allowNull: true,
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  Posts.associate = function (models) {
    models.blog.posts.posts.belongsTo(models.blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id',
        // allowNull: false -- already defined
      },
    });
  };

  return Posts;
};
