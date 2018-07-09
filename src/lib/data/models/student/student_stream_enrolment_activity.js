module.exports = function (sequelize, DataTypes) {
  const StudentStreamEnrolmentActivity = sequelize
    .define('student_stream_enrolment_activity', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      stream_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      activity: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
    });

  StudentStreamEnrolmentActivity.associate = function (models) {
    models.student.student_stream_enrolment_activity
      .belongsTo(models.people.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'people_id',
        // allowNull: false -- already defined
        },
      });

    models.student.student_stream_enrolment_activity
      .belongsTo(models.academics.streams_offered, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'stream_id',
        // allowNull: false -- already defined
        },
      });
  };

  return StudentStreamEnrolmentActivity;
};
