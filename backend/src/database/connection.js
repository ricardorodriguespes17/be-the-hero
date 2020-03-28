const knex = require('knex')
const configuration = require('../../knexfile')

const settings = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(settings)

module.exports = connection