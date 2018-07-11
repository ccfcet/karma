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
    models.blog.blog_people_association.belongsTo(models.people.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });

    models.blog.blog_people_association.belongsTo(models.blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id',
        // allowNull: false -- already defined
      },
    });
  };

  return BlogPeopleAssociation;
};
