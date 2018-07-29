module.exports = function (sequelize, DataTypes) {
  const NewsData = sequelize.define('news_data', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
  });

  return NewsData;
};
