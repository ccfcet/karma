module.exports = function (sequelize, DataTypes) {
  const EntityPeopleEnrollment = sequelize
    .define('entity_people_enrollment', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      entity_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      date_time: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      activity: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
    });

  EntityPeopleEnrollment.associate = function (models) {
    models.entities.entity_people_enrollment
      .belongsTo(models.entities.entities, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'entity_id',
        // allowNull: false -- already defined
        },
      });

    models.entities.entity_people_enrollment
      .belongsTo(models.people.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'people_id',
        // allowNull: false -- already defined
        },
      });
  };

  return EntityPeopleEnrollment;
};
