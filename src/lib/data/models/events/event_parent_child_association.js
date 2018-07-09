

module.exports = function (sequelize, DataTypes) {
  const EventParentChildAssociation = sequelize
    .define('event_parent_child_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
      child_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
    });

  EventParentChildAssociation.associate = function (models) {
    models.Events.event_parent_child_association
      .belongsTo(models.Events.events, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'parent_id',
        // allowNull: false -- already defined
        },
      });
    models.Events.event_parent_child_association
      .belongsTo(models.Events.events, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'child_id',
        // allowNull: false -- already defined
        },
      });
  };

  return EventParentChildAssociation;
};
