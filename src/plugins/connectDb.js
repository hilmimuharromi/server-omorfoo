const fastifyPlugin = require('fastify-plugin')

async function dbConnector(fastify, options) {
    const { DB_USER, DB_NAME, DB_PASSWORD } = fastify.config
    fastify.register(require('fastify-postgres'), {
        connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@localhost:5433/${DB_NAME}`
    })
}

module.exports = fastifyPlugin(dbConnector)