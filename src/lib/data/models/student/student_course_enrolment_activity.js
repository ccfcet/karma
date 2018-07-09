module.exports = function (sequelize, DataTypes) {
  const StudentCourseEnrolmentActivity = sequelize
    .define('student_course_enrolment_activity', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      course_id: {
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

  StudentCourseEnrolmentActivity.associate = function (models) {
    models.student.student_course_enrolment_activity
      .belongsTo(models.people.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'people_id',
        // allowNull: false -- already defined
        },
      });

    models.student.student_course_enrolment_activity
      .belongsTo(models.academics.courses_offered, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'course_id',
        // allowNull: false -- already defined
        },
      });
  };

  return StudentCourseEnrolmentActivity;
};
