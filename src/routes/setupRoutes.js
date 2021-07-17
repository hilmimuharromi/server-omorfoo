const { dbSchema, userSchema } = require('../schema/setupSchema')
async function routes(fastify, options) {
    const client = fastify.db.client
    fastify.post('/setup/db', { schema: dbSchema }, async (req, reply) => {
        try {

            // const client = await fastify.pg.connect()
            const { SETUP_PASSWORD } = fastify.config
            const { setupPassword } = req.body

            if (setupPassword === SETUP_PASSWORD) {
                const result = await client.query(
                    `CREATE TABLE IF NOT EXISTS "Users"(
                id serial PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR NOT NULL,
                role VARCHAR(50) NOT NULL,
                "createdAt" TIMESTAMPTZ DEFAULT Now()
                );
    
                CREATE TABLE IF NOT EXISTS "Products"(
                id serial PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                "productCode" VARCHAR(255) UNIQUE NOT NULL,
                stock INT NOT NULL,
                "minimalStock" INT NOT NULL,
                price INT NOT NULL,
                "capitalPrice" INT NOT NULL,
                brand VARCHAR NOT NULL,
                type VARCHAR NOT NULL,
                "createdAt" TIMESTAMPTZ DEFAULT Now()
                );
                
                CREATE TABLE IF NOT EXISTS "Transactions"(
                    id serial PRIMARY KEY,
                    "userId" INT NOT NULL,
                    items jsonb,
                    "transactionType" VARCHAR NOT NULL,
                    "paymentType" VARCHAR NOT NULL,
                    profit INT NOT NULL,
                    "createdAt" TIMESTAMPTZ DEFAULT Now(),
                    FOREIGN KEY ("userId")
                    REFERENCES "Users" (id)
                )
                `,
                )
                // client.release()
                return result
            } else {
                throw new Error('tidak memiliki akses')
            }
        } catch (error) {
            reply.code(400).send(error)
        }
    })

    fastify.post('/setup/user', { schema: userSchema }, async (req, reply) => {
        try {
            const { data, setupPassword } = req.body
            const { SETUP_PASSWORD } = fastify.config
            if (setupPassword === SETUP_PASSWORD) {
                // const client = await fastify.pg.connect()
                const result = await Promise.all(data.map(async (item) => {
                    const query = 'INSERT INTO "Users"(username, password, role) VALUES($1, $2, $3) RETURNING *'
                    const hashPassword = await fastify.bcrypt.hash(item.password)
                    let values = [item.username, hashPassword, item.role]
                    const { rows } = await client.query(query, values,
                    )
                    return rows[0]
                }));

                // client.release()
                console.log(result)
                reply.code(201).send({
                    status: 'success',
                    data: result
                })
            } else {
                throw new Error('Tidak memiliki akses')
            }
        } catch (error) {
            reply.code(400).send(error)
        }
    })
}

module.exports = routes