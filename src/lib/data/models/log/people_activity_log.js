

module.exports = function (sequelize, DataTypes) {
  const PeopleActivityLog = sequelize.define('people_activity_log', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    people_activity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  PeopleActivityLog.associate = function (models) {
    models.Log.people_activity_log.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });

    models.Log.people_activity_log.belongsTo(models.Log.people_activities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_activity_id',
        // allowNull: false -- already defined
      },
    });
  };

  return PeopleActivityLog;
};
