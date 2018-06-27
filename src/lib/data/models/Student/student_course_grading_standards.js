module.exports = function (sequelize, DataTypes) {
  const StudentCourseGradingStandards = sequelize
    .define('student_course_grading_standards', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      standard_name: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      standard_description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    });

  return StudentCourseGradingStandards;
};
