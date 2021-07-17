const { loginSchema, addAdminSchema, allUserSchema, updateUserSchema } = require('../schema/userSchema')
async function routes(fastify, options) {
    fastify.post('/user',
        {
            schema: addAdminSchema,
            preValidation: [fastify.authenticate, fastify.ownerAuthorization]
        }, async (req, reply) => {
            try {
                const { username, password, role } = req.body
                const hashPassword = await fastify.bcrypt.hash(password)
                const client = await fastify.pg.connect()
                const query = 'INSERT INTO "Users"(username, password, role) VALUES($1, $2, $3) RETURNING *'
                const values = [username, hashPassword, role]
                const { rows } = await client.query(query, values,
                )
                const user = rows[0]
                delete user.password
                const token = await reply.jwtSign({ ...user })
                user.token = token
                client.release()
                reply.code(201).send({
                    status: 'success',
                    data: user
                })
            } catch (error) {
                reply.code(400).send(error)
            }
        })

    fastify.put('/user/:id',
        {
            schema: updateUserSchema,
            preValidation: [fastify.authenticate, fastify.ownerAuthorization]
        }, async (req, reply) => {
            try {
                const { username, password, role } = req.body
                const { id } = req.params

                const hashPassword = await fastify.bcrypt.hash(password)
                console.log('update user', req.body, id)
                const client = await fastify.pg.connect()
                let query = 'UPDATE "Users" SET username= $2,  role=$3, password=$4 WHERE id = $1 RETURNING *'
                let values = [id, username, role, hashPassword,]
                if (!password) {
                    query = 'UPDATE "Users" SET username= $2,  role=$3 WHERE id = $1 RETURNING *'
                    values = [id, username, role]
                }
                const { rows } = await client.query(query, values,
                )
                client.release()
                reply.code(200).send({
                    status: 'success',
                    data: rows[0]
                })
            } catch (error) {
                reply.code(400).send(error)
            }
        })



    fastify.post('/login', { schema: loginSchema }, async (req, reply) => {
        try {
            const { username, password } = req.body
            const client = await fastify.pg.connect()
            const result = await client.query(
                'SELECT * FROM "Users" WHERE username=$1', [username],
            )
            if (result.rowCount < 1) {
                throw new Error('username / password tidak sesuai')
            }
            const user = result.rows[0]
            const isVerif = await fastify.bcrypt.compare(password, user.password)
            if (!isVerif) {
                throw new Error('username / password tidak sesuai')
            }
            delete user.password
            const token = await reply.jwtSign({ ...user })
            user.token = token
            client.release()
            reply.code(200).send({
                status: 'success',
                data: user
            })
        } catch (error) {
            reply.code(400).send(error)
        }
    })

    fastify.get('/allusers', { schema: allUserSchema, preValidation: [fastify.authenticate, fastify.ownerAuthorization] }, async (req, reply) => {

        try {
            const client = await fastify.pg.connect()
            const query = 'SELECT * FROM "Users"'
            const { rows } = await client.query(query)

            reply.code(200).send({
                status: 'success',
                data: rows
            })

        } catch (error) {
            reply.code(400).send(error)
        }
    })
}

module.exports = routes