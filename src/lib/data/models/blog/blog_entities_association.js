module.exports = function (sequelize, DataTypes) {
  const BlogEntitiesAssociation = sequelize
    .define('blog_entities_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      blog_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      status: {
        type: DataTypes.CHAR(1),
      },
    });

  BlogEntitiesAssociation.associate = function (models) {
    models.blog.blog_entities_association.belongsTo(models.entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_id',
        // allowNull: false -- already defined
      },
    });

    models.blog.blog_entities_association.belongsTo(models.blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id',
        // allowNull: false -- already defined
      },
    });
  };

  return BlogEntitiesAssociation;
};
