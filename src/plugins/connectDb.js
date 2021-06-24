const fastifyPlugin = require('fastify-plugin')

async function dbConnector(fastify, options) {
    const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = fastify.config
    fastify.register(require('fastify-postgres'), {
        user: DB_USER,
        database: DB_NAME,
        host: 'localhost',
        password: DB_PASSWORD,
        port: DB_PORT
    })
}

module.exports = fastifyPlugin(dbConnector)