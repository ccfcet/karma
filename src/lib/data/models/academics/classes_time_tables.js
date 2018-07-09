module.exports = function (sequelize, DataTypes) {
  const ClassesTimeTables = sequelize.define('classes_time_tables', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    class_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    time_slot_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    faculty_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });

  ClassesTimeTables.associate = function (models) {
    models.Academics.classes_time_tables.belongsTo(models.Academics.classes, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'class_id',
        // allowNull: false -- already defined
      },
    });

    models.Academics.classes_time_tables
      .belongsTo(models.Academics.time_slots, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'time_slot_id',
        // allowNull: false -- already defined
        },
      });

    models.Academics.classes_time_tables
      .belongsTo(models.Faculty.faculty_academic_enrolment_activity, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'faculty_id',
        // allowNull: false -- already defined
        },
      });
  };

  return ClassesTimeTables;
};
