const fastifyEnv = require('fastify-env')
const fastifyPlugin = require('fastify-plugin')

async function dotenv(fastify) {
    const schema = {
        type: 'object',
        required: ['PORT'],
        properties: {
            PORT: {
                type: 'string',
                default: 3000
            },
            DB_USER: {
                type: 'string',
            },
            DB_PASSWORD: {
                type: 'string',
            },
            DB_NAME: {
                type: 'string',
            },
            SETUP_PASSWORD: {
                type: 'string',
            },
            DB_PORT: {
                type: 'string',
                default: 5432
            }
        }
    }

    const options = {
        dotenv: true,
        confKey: 'config', // optional, default: 'config'
        schema: schema,
    }

    fastify.register(fastifyEnv, options)
}

module.exports = fastifyPlugin(dotenv)