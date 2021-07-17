const fastifyPlugin = require('fastify-plugin')
const { Client } = require('pg')
require('dotenv').config()
const client = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: 'localhost',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
async function dbconnector(fastify, options) {
    try {
        await client.connect()
        console.log("db connected succesfully")
        fastify.decorate('db', { client })
    } catch (err) {
        console.error(err)
    }
}
module.exports = fastifyPlugin(dbconnector)