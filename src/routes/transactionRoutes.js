const { addTransaction, getTransaction } = require('../schema/transactionSchema')
async function routes(fastify, options) {
    fastify.post('/transaction',
        {
            preValidation: [fastify.authenticate, fastify.adminAuthorization],
            schema: addTransaction
        },
        async (req, reply) => {
            const client = await fastify.pg.connect()
            try {
                const { id } = req.user
                const { items, transactionType, paymentType } = req.body
                let profit = 0
                await client.query("BEGIN");

                await Promise.all(items.map(async (item) => {
                    const result = await client.query(`SELECT * FROM "Products" WHERE id = $1`, [item.product])
                    const productDetail = result.rows[0]
                    if (!productDetail) {
                        client.query("ROLLBACK");
                        throw new Error('Product Not Found')
                    }
                    profit += item.dealPrice - productDetail.capitalPrice
                    let currentStock = productDetail.stock - item.quantity

                    if (currentStock < 0) {
                        client.query("ROLLBACK");
                        throw new Error('Stock Tidak Cukup')
                    }
                    item.capitalPrice = productDetail.capitalPrice
                    const queryUpdate = `UPDATE "Products" SET stock=$1 WHERE id = $2 returning *`
                    const values = [currentStock, item.product];
                    const { rows } = await client.query(queryUpdate, values)
                    return rows[0]
                }));

                const query = 'INSERT INTO "Transactions"("userId", items, "transactionType", "paymentType", profit) VALUES($1, $2, $3, $4, $5) RETURNING *'
                const values = [id, JSON.stringify(items), transactionType, paymentType, profit]
                const { rows } = await client.query(query, values,)
                const result = rows[0]
                await client.query("COMMIT");
                reply.code(201).send({
                    status: 'success',
                    data: result
                })
            } catch (error) {
                client.query("ROLLBACK");
                reply.code(400).send(error)
            } finally {
                client.release();
                console.log("Client is released");
            }
        })

    fastify.get('/transaction/:params', {
        preValidation: [fastify.authenticate, fastify.adminAuthorization],
        schema: getTransaction
    }, async (req, reply) => {
        const { startDate, endDate } = req.query

        console.log('req.query =>', req.query)

        try {
            const client = await fastify.pg.connect()

            let formatStartDate = new Date(new Date(startDate).setHours(00, 00, 00))
            let formatEndDate = new Date(new Date(endDate).setHours(23, 59, 59))

            const query = `SELECT  * from "Transactions" where "createdAt" between $1 and $2`
            const values = [formatStartDate, formatEndDate]

            const { rows } = await client.query(query, values,)
            reply.code(201).send({
                status: 'success',
                data: rows
            })

        } catch (error) {
            reply.code(400).send(error)
        }


    })

}

module.exports = routes