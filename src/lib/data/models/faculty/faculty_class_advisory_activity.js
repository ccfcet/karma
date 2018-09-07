module.exports = function (sequelize, DataTypes) {
  const FacultyClassAdvisoryActivity = sequelize
    .define('faculty_class_advisory_activity', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      class_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      activity: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      date_time: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    });

  FacultyClassAdvisoryActivity.associate = function (models) {
    models.faculty.faculty_class_advisory_activity
      .belongsTo(models.people.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'people_id',
        // allowNull: false -- already defined
        },
      });

    models.faculty.faculty_class_advisory_activity
      .belongsTo(models.academics.classes, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'class_id',
        // allowNull: false -- already defined
        },
      });

    models.faculty.faculty_class_advisory_activity
      .belongsTo(models.academics.courses_offered, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'course_id',
          // allowNull: false -- already defined
        },
      });
  };

  return FacultyClassAdvisoryActivity;
};
