

module.exports = function (sequelize, DataTypes) {
  const StudentCourseGrades = sequelize.define('student_course_grades', {
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
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    grading_standard_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  StudentCourseGrades.associate = function (models) {
    models.Student.student_course_grades.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });

    models.Student.student_course_grades
      .belongsTo(models.Academics.courses_offered, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'course_id',
        // allowNull: false -- already defined
        },
      });

    models.Student.student_course_grades
      .belongsTo(models.Student.student_course_grading_standards, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'grading_standard_id',
        // allowNull: false -- already defined
        },
      });
  };

  return StudentCourseGrades;
};
