const tableNames = require('../../constants/tableNames');

const addDefaultColumns = async (table) => {
  table.timestamps(false, true);
  table.datetime('deleted_at');
};

const createIdValueTable = async (knex, tableName) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
  });
};

const createReference = (table, tableName) => {
  return table
    .integer(`${tableName}_id`)
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
};

exports.up = async (knex) => {
  // Independent Tables
  await createIdValueTable(knex, tableNames.nationality);

  // Dependent Tables
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string('first_name').notNullable();
    table.string('middle_name');
    table.string('last_name').notNullable();
    table.specificType('gender', 'CHAR(1)').notNullable();
    table.date('date_of_birth').notNullable();
    createReference(table, 'nationality').notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.email, (table) => {
    table.increments().notNullable();
    createReference(table, 'user').notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.auth, (table) => {
    table.increments().notNullable();
    createReference(table, 'user').notNullable();
    table.string('password_hash').notNullable();
    addDefaultColumns(table);
  });
};

// Add data to the array in reverse order.
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.auth,
      tableNames.email,
      tableNames.user,
      tableNames.nationality,
    ].map((tableName) => knex.schema.dropTable(tableName))
  );
};
