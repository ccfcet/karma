module.exports = function (sequelize, DataTypes) {
  const StudentCourseInternalAssessment = sequelize
    .define('student_course_internal_assessment', {
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
      type: {
        type: DataTypes.STRING(23),
        allowNull: false,
      },
      start_date_time: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      end_date_time: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      marks_obtained: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      maximum_marks: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
    });

  StudentCourseInternalAssessment.associate = function (models) {
    models.student.student_course_internal_assessment
      .belongsTo(models.people.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'people_id',
        // allowNull: false -- already defined
        },
      });

    models.student.student_course_internal_assessment
      .belongsTo(models.academics.courses_offered, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'course_id',
        // allowNull: false -- already defined
        },
      });
  };

  return StudentCourseInternalAssessment;
};
