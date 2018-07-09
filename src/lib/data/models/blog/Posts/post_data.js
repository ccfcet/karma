

module.exports = function (sequelize, DataTypes) {
  const PostData = sequelize.define('post_data', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    post_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    post_element_status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    post_content: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
  });

  PostData.associate = function (models) {
    models.Blog.Posts.post_data.belongsTo(models.Blog.Posts.posts, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'post_id',
        // allowNull: false -- already defined
      },
    });

    models.Blog.Posts.post_data.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'author_id',
        // allowNull: false -- already defined
      },
    });
  };

  return PostData;
};
