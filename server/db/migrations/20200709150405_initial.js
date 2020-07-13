const Knex = require('knex');

const {addDefaultColumns, references} = require('../../lib/tableUtils');
const tableNames = require('../../constants/tableNames');

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {

    await Promise.all([
      
      knex.schema.createTable(tableNames.user, (table) => {
        table.increments().notNullable();
        table.string('email', 254).notNullable().unique();
        table.string('name').notNullable();
        table.string('password', 100).notNullable();
        addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.item_type, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      addDefaultColumns(table);
    }),
  ]);
  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('logo_url', 2000);
    table.string('description', 500);
    references(table, tableNames.item_type);
    references(table, tableNames.user);
    addDefaultColumns(table);
  });

};


/**
 * @param {Knex} knex
 */

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists(tableNames.item),
    knex.schema.dropTableIfExists(tableNames.item_type),
    knex.schema.dropTableIfExists(tableNames.user),
  ]);

  /*
  could also do: 
  await Promsie.all([tableNames.user, tableNames.item, tableNames.item_type]
    .map((tableName) => knex.schema.dropTable(tableName)));
  */
};
