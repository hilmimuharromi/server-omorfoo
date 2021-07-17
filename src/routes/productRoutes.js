const { addProduct, updateProduct, deleteProduct, getAllProduct } = require('../schema/productSchema')


async function routes(fastify, options) {
    const client = fastify.db.client
    fastify.post('/product', {
        preValidation: [fastify.authenticate, fastify.adminAuthorization],
        schema: addProduct
    }, async (req, reply) => {
        try {
            const { name, productCode, stock, minimalStock, price, capitalPrice, brand, type } = req.body
            // const client = await fastify.pg.connect()
            const query = 'INSERT INTO "Products"( name, "productCode", stock, "minimalStock", price, "capitalPrice", brand, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
            const values = [name, productCode, stock, minimalStock, price, capitalPrice, brand, type]
            const { rows } = await client.query(query, values)
            // client.release()
            const result = rows[0]
            reply.code(201).send({
                status: 'success',
                data: result
            })
        } catch (error) {
            reply.code(400).send(error)
        }
    });

    fastify.put('/product/:id', {
        preValidation: [fastify.authenticate, fastify.adminAuthorization],
        schema: updateProduct
    }, async (req, reply) => {
        try {
            const { id } = req.params
            const { name, productCode, stock, minimalStock, price, capitalPrice, brand, type } = req.body
            // const client = await fastify.pg.connect()


            const query = `UPDATE "Products"
            SET name=$1, "productCode" = $2, stock=$3, "minimalStock"=$4, price=$5, "capitalPrice"=$6, brand=$7, type=$8
            WHERE id = $9 returning *`

            const values = [name, productCode, stock, minimalStock, price, capitalPrice, brand, type, id];

            const { rows } = await client.query(query, values)
            // client.release()
            const result = rows[0]
            reply.code(200).send({
                status: 'success',
                data: result
            })
        } catch (error) {
            reply.code(400).send(error)
        }
    })

    fastify.delete('/product/:id', {
        preValidation: [fastify.authenticate, fastify.adminAuthorization],
        schema: deleteProduct
    }, async (req, reply) => {
        try {
            const { id } = req.params
            // const client = await fastify.pg.connect()
            const query = `DELETE FROM "Products" WHERE id = $1 returning *`
            const values = [id];

            const { rows } = await client.query(query, values)
            const result = rows[0]

            // client.release()
            reply.code(200).send({
                status: 'success',
                data: result
            })
        } catch (error) {
            reply.code(400).send(error)
        }
    })

    fastify.get('/product', {
        preValidation: [fastify.authenticate, fastify.adminAuthorization],
        schema: getAllProduct
    }, async (req, reply) => {
        try {
            // const client = await fastify.pg.connect()
            const query = `SELECT * FROM "Products"`
            const { rows } = await client.query(query)
            const result = rows
            // client.release()
            reply.code(200).send({
                status: 'success',
                data: result
            })
        } catch (error) {
            reply.code(400).send(error)
        }
    })

}
module.exports = routes
