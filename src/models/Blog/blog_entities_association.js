'use strict'

module.exports = function (sequelize, DataTypes) {
  var BlogEntitiesAssociation = sequelize.define('blog_entities_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    blog_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    entity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(1)
    }
  })

  BlogEntitiesAssociation.associate = function (models) {
    models.Blog.blog_entities_association.belongsTo(models.Entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_id'
        // allowNull: false -- already defined
      }
    })

    models.Blog.blog_entities_association.belongsTo(models.Blog.blogs, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'blog_id'
        // allowNull: false -- already defined
      }
    })
  }

  return BlogEntitiesAssociation
}
