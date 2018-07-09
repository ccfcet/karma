

module.exports = function (sequelize, DataTypes) {
  const StudentAttendanceData = sequelize.define('student_attendance_data', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    course_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    faculty_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    // switch to multiple compositeIndex when sequelize supports it.
    // https://github.com/sequelize/sequelize/issues/8148
    start_date_time: {
      type: DataTypes.DATE(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    end_date_time: {
      type: DataTypes.DATE(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    value: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  StudentAttendanceData.associate = function (models) {
    models.Student.student_attendance_data.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });

    models.Student.student_attendance_data
      .belongsTo(models.Academics.courses_offered, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'course_id',
        // allowNull: false -- already defined
        },
      });

    models.Student.student_attendance_data
      .belongsTo(models.People.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'faculty_id',
        // allowNull: false -- already defined
        },
      });
  };

  return StudentAttendanceData;
};
