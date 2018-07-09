

module.exports = function (sequelize, DataTypes) {
  const EventInformation = sequelize.define('event_information', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: true,
    },
    slug_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: true,
    },
    data: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
  });

  EventInformation.associate = function (models) {
    models.Events.event_information.belongsTo(models.Events.events, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'event_id',
        // allowNull: false -- already defined
      },
    });
    models.Events.event_information
      .belongsTo(models.Events.event_information_slugs, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'slug_id',
        // allowNull: false -- already defined
        },
      });
  };

  return EventInformation;
};
