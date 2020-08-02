const tableNames = require('../../constants/tableNames');

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

  // TABLE_NAME: field
  await knex.schema.createTable(tableNames.field, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('label').notNullable();
    table.boolean('required').notNullable();
    table.json('allowed_values');
    createReference(table, tableNames.data_type);
    table.text('regex');
    addDefaultColumns(table);
  });

  // TABLE_NAME: people_field_value
  await knex.schema.createTable(tableNames.people_field_value, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.people);
    createReference(table, tableNames.field);
    table.string('value').notNullable();
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

  // TABLE_NAME: entity_type_field
  await knex.schema.createTable(tableNames.entity_type_field, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.field);
    createReference(table, tableNames.entity_type);
    addDefaultColumns(table);
  });

  // TABLE_NAME: entity_field_value
  await knex.schema.createTable(tableNames.entity_field_value, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.field);
    createReference(table, tableNames.entity);
    table.text('value').notNullable();
    addDefaultColumns(table);
  });

  // TABLE_NAME: entity_address
  await knex.schema.createTable(tableNames.entity_address, (table) => {
    table.increments().notNullable();
    createReference(table, tableNames.address);
    createReference(table, tableNames.entity);
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
    createReference(table, tableNames.entity);
    createReference(table, tableNames.academic_duration);
    addDefaultColumns(table);
  });

  // TABLE_NAME: course_instance_association
  await knex.schema.createTable(
    tableNames.course_instance_association,
    (table) => {
      table.increments().notNullable();
      createReference(table, tableNames.course_instance).notNullable();
      createReference(table, tableNames.people);
      // Change role to FK. For now, use 0/1 for Student/Faculty
      table.integer('role_id', 1).notNullable();
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
};

// Add data to the array in reverse order.
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.attendance_data,
      tableNames.course_instance_association,
      tableNames.course_instance,
      tableNames.academic_duration,
      tableNames.course,
      tableNames.entity_parent_child,
      tableNames.entity_address,
      tableNames.entity_field_value,
      tableNames.entity_type_field,
      tableNames.entity,
      tableNames.entity_type,
      tableNames.people_field_value,
      tableNames.field,
      tableNames.auth,
      tableNames.email,
      tableNames.people_address,
      tableNames.identifier,
      tableNames.people,
      tableNames.data_type,
      tableNames.address,
      tableNames.state,
      tableNames.country,
      tableNames.nationality,
    ].map((tableName) => knex.schema.dropTable(tableName))
  );
};
