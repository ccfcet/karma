module.exports = function (sequelize, DataTypes) {
  const News = sequelize.define('news', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    news_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    entity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
  });

  News.associate = function (models) {
    models.news.news.belongsTo(models.news.news_data, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'news_id',
        // allowNull: false -- already defined
      },
    });

    models.news.news.belongsTo(models.entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'entity_id',
        // allowNull: false -- already defined
      },
    });
  };

  return News;
};
