module.exports = function (sequelize, DataTypes) {
  const BlogRolePeopleAssociation = sequelize
    .define('blog_role_people_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      blog_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    });

  BlogRolePeopleAssociation.associate = function (models) {
    models.blog.blog_role_people_association.belongsTo(models.people.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });

    models.blog.blog_role_people_association.belongsTo(models.blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id',
        // allowNull: false -- already defined
      },
    });

    models.blog.blog_role_people_association.belongsTo(models.blog.blog_roles, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'role_id',
        // allowNull: false -- already defined
      },
    });
  };

  return BlogRolePeopleAssociation;
};
