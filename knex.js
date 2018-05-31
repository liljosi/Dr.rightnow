var knexFile = require('./knexfile.js');
var knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);

module.exports = knex;