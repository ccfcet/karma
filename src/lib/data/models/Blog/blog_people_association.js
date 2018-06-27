

module.exports = function (sequelize, DataTypes) {
  const BlogPeopleAssociation = sequelize.define('blog_people_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR(1),
    },
  });

  BlogPeopleAssociation.associate = function (models) {
    models.Blog.blog_people_association.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });

    models.Blog.blog_people_association.belongsTo(models.Blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id',
        // allowNull: false -- already defined
      },
    });
  };

  return BlogPeopleAssociation;
};
