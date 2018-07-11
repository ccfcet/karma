module.exports = function (sequelize, DataTypes) {
  const StreamsOffered = sequelize.define('streams_offered', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    stream_type_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    stream_name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    valid_start_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    valid_end_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  });

  StreamsOffered.associate = function (models) {
    models.academics.streams_offered.belongsTo(models.academics.stream_types, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'stream_type_id',
        // allowNull: false -- already defined
      },
    });

    models.academics.streams_offered.belongsTo(models.entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'department_id',
      // allowNull: false -- already defined
      },
    });
  };

  return StreamsOffered;
};
