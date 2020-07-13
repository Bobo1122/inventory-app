//todo: install bcrypt | hash passwords
const Knex = require('knex');

const orderedTableNames = require('../../constants/orderedTableNames');
const tableNames = require('../../constants/tableNames');

/**
 * @param {Knex} knex
*/
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await orderedTableNames
    .reduce(async (promise, table_name) => {
      await promise;
      console.log('Clearing', table_name);
      return knex(table_name).del();
    }, Promise.resolve());
      // Inserts seed entries (don't set id)
    const user = {
      email: 'test@test.com',
      name: 'Bobo',
      password: 'test' //todo: store hashed passwords
    }
    const [userCreated] = await knex(tableNames.user).insert(user).returning('*');
    console.log(userCreated);
};
