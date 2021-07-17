const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {
    const client = fastify.db.client
    fastify.decorate("ownerAuthorization", async function (request, reply) {
        try {
            // const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT * FROM "Users" WHERE username=$1', [request.user.username],
            )

            if (rows.length < 1) throw new Error('not authorization')
            if (rows[0].role !== 'owner') throw new Error('not authorization')
        } catch (err) {
            reply.send(err)
        }
    })

    fastify.decorate("adminAuthorization", async function (request, reply) {
        try {
            // const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT * FROM "Users" WHERE username=$1', [request.user.username],
            )

            if (rows.length < 1) throw new Error('not authorization')
            if (rows[0].role !== 'owner' && rows[0].role !== 'admin') throw new Error('not authorization')
        } catch (err) {
            reply.send(err)
        }
    })
})