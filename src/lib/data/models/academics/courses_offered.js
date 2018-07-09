module.exports = function (sequelize, DataTypes) {
  const CoursesOffered = sequelize.define('courses_offered', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    official_course_id: {
      type: DataTypes.STRING(31),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    credits: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    valid_start_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    valid_end_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    duration_in_days: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  CoursesOffered.associate = function (models) {
    models.academics.courses_offered.belongsTo(models.entities.entities, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'department_id',
        // allowNull: false -- already defined
      },
    });
  };

  return CoursesOffered;
};
