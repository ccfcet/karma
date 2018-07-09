module.exports = function (sequelize, DataTypes) {
  const Classes = sequelize.define('classes', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    stream_id: {
      type: DataTypes.INTEGER(),
      unique: 'compositeIndex',
    },
    division: {
      type: DataTypes.INTEGER(),
      unique: 'compositeIndex',
    },
    current_class_slug: {
      type: DataTypes.STRING(20),
      unique: 'compositeIndex',
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  });

  Classes.associate = function (models) {
    models.academics.classes.belongsTo(models.academics.streams_offered, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'stream_id',
        // allowNull: false -- already defined
      },
    });
  };

  return Classes;
};
