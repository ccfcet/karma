module.exports = function (sequelize, DataTypes) {
  const StudentCourseGradingStandardsGradeAssociation = sequelize
    .define('student_course_grading_standards_grade_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      grading_standard_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
    });

  StudentCourseGradingStandardsGradeAssociation.associate = function (models) {
    models.student.student_course_grading_standards_grade_association
      .belongsTo(models.student.student_course_grading_standards, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'grading_standard_id',
        // allowNull: false -- already defined
        },
      });
  };

  return StudentCourseGradingStandardsGradeAssociation;
};
