const knex = require('knex');
const { Model } = require('objection'); // setting up connection for models

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;