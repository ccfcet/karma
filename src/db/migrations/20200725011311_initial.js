const tableNames = require('../../constants/tableNames');
const orderedTableNames = require('../../constants/orderedTableNames');

const addDefaultColumns = async (table) => {
  table.timestamps(false, true);
  table.datetime('deleted_at');
};

const createIdValueTable = async (knex, tableName) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().notNullable();
    // Remove unique and make use unique parameter if the use case arises
    table.string('value').notNullable().unique();
    addDefaultColumns(table);
  });
};

const createReference = (table, tableName, columnName = undefined) => {
  return table
    .integer(columnName || `${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
};

exports.up = async (knex) => {
  // TABLE_NAME: nationality
  await createIdValueTable(knex, tableNames.nationality);

  // TABLE_NAME: country
  await knex.schema.createTable(tableNames.country, (table) => {
    table.increments().notNullable();
    table.string('name', 50).notNullable().unique();
    table.string('code', 3).notNullable().unique();
    addDefaultColumns(table);
  });

  // TABLE_NAME: data_type
  await createIdValueTable(knex, tableNames.data_type);

  // TABLE_NAME: state
  await knex.schema.createTable(tableNames.state, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('code', 4).unique();
    createReference(table, tableNames.country).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: address
  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable();
    table.string('line_1').notNullable();
    table.string('line_2');
    table.string('city').notNullable();
    createReference(table, tableNames.country).notNullable();
    createReference(table, tableNames.state).notNullable();
    table.string('zipcode', 16).notNullable();
    table.float('latitude');
    table.float('longitude');
    addDefaultColumns(table);
  });

  // TABLE_NAME: people
  await knex.schema.createTable(tableNames.people, (table) => {
    table.increments().notNullable();
    table.string('first_name').notNullable();
    table.string('middle_name');
    table.string('last_name').notNullable();
    table.specificType('gender', 'CHAR(1)').notNullable();
    table.date('date_of_birth').notNullable();
    createReference(table, tableNames.nationality).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: identifier
  await knex.schema.createTable(tableNames.identifier, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.people).notNullable();
    table.string('identifier').notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: people_address
  await knex.schema.createTable(tableNames.people_address, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.people).notNullable();
    createReference(table, tableNames.address).notNullable();
    createReference(table, tableNames.data_type).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: email
  await knex.schema.createTable(tableNames.email, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.people).notNullable();
    table.string('email').notNullable().unique();
    createReference(table, tableNames.data_type).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: auth
  await knex.schema.createTable(tableNames.auth, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.people).notNullable();
    table.string('password_hash').notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: entity_type
  await createIdValueTable(knex, tableNames.entity_type);

  // TABLE_NAME: entity
  await knex.schema.createTable(tableNames.entity, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    createReference(table, tableNames.entity_type);
    addDefaultColumns(table);
  });

  // TABLE_NAME: entity_address
  await knex.schema.createTable(tableNames.entity_address, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.address);
    createReference(table, tableNames.entity);
    createReference(table, tableNames.data_type).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: entity_parent_child
  await knex.schema.createTable(tableNames.entity_parent_child, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.entity, 'parent_id');
    createReference(table, tableNames.entity, 'child_id');
    addDefaultColumns(table);
  });

  // TABLE_NAME: course
  await knex.schema.createTable(tableNames.course, (table) => {
    table.increments().notNullable();
    table.string('code', 5).unique();
    table.string('name').notNullable();
    createReference(table, tableNames.entity);
    table.float('credits');
    addDefaultColumns(table);
  });

  // TABLE_NAME: academic_duration
  await knex.schema.createTable(tableNames.academic_duration, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.date('start_date').notNullable().unique();
    table.date('end_date').notNullable().unique();
    addDefaultColumns(table);
  });

  // TABLE_NAME: course_instance
  await knex.schema.createTable(tableNames.course_instance, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.course).notNullable();
    table.string('tag').notNullable();
    createReference(table, tableNames.academic_duration);
    addDefaultColumns(table);
  });

  // TABLE_NAME: role
  await knex.schema.createTable(tableNames.role, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('tag').notNullable().unique();
    addDefaultColumns(table);
  });

  // TABLE_NAME: role_people_entity
  await knex.schema.createTable(tableNames.role_people_entity, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.role);
    createReference(table, tableNames.people);
    createReference(table, tableNames.entity);
    table.boolean('is_superuser').defaultTo(false);
    addDefaultColumns(table);
  });

  // TABLE_NAME: course_instance_association
  await knex.schema.createTable(
    tableNames.course_instance_association,
    (table) => {
      table.increments().notNullable();
      createReference(table, tableNames.course_instance).notNullable();
      createReference(table, tableNames.people);
      createReference(table, tableNames.role);
      addDefaultColumns(table);
    }
  );

  // TABLE_NAME: attendance_data
  await knex.schema.createTable(tableNames.attendance_data, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.course_instance).notNullable();
    createReference(table, tableNames.people).notNullable();
    // TODO: Finalise the attendance decision.
    table.datetime('time').notNullable();
    table.integer('value', 1).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: superuser
  await knex.schema.createTable(tableNames.superuser, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.people).notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: people_entity_permission
  await knex.schema.createTable(
    tableNames.people_entity_permission,
    (table) => {
      table.increments().notNullable();
      createReference(table, tableNames.people).notNullable();
      createReference(table, tableNames.entity).notNullable();
    }
  );

  // TABLE_NAME: role_entity_permission
  await knex.schema.createTable(tableNames.role_entity_permission, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.role).notNullable();
    createReference(table, tableNames.entity).notNullable();
  });

  // TABLE_NAME: people_course_instance_permission
  await knex.schema.createTable(
    tableNames.people_course_instance_permission,
    (table) => {
      table.increments().notNullable();
      createReference(table, tableNames.people).notNullable();
      createReference(table, tableNames.course_instance).notNullable();
    }
  );

  // TABLE_NAME: role_course_instance_permission
  await knex.schema.createTable(
    tableNames.role_course_instance_permission,
    (table) => {
      table.increments().notNullable();
      createReference(table, tableNames.role).notNullable();
      createReference(table, tableNames.course_instance).notNullable();
    }
  );
};

// Add data to the array in reverse order.
exports.down = async (knex) => {
  await Promise.all(
    orderedTableNames.map((tableName) => knex.schema.dropTable(tableName))
  );
};
