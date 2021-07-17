const { addTransaction, getTransaction } = require('../schema/transactionSchema')
const moment = require('moment')
async function routes(fastify, options) {
    const client = fastify.db.client
    fastify.post('/transaction',
        {
            preValidation: [fastify.authenticate, fastify.adminAuthorization],
            schema: addTransaction
        },
        async (req, reply) => {
            try {
                const { id } = req.user
                const { items, transactionType, paymentType } = req.body
                let profit = 0
                let totalPrice = 0
                await client.query("BEGIN");

                await Promise.all(items.map(async (item) => {
                    const result = await client.query(`SELECT * FROM "Products" WHERE id = $1`, [item.product])
                    const productDetail = result.rows[0]
                    if (!productDetail) {
                        client.query("ROLLBACK");
                        throw new Error('Product Not Found')
                    }
                    let itemsProfit = (item.dealPrice - productDetail.capitalPrice) * item.quantity
                    profit += itemsProfit
                    totalPrice += item.dealPrice * item.quantity
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

                const query = 'INSERT INTO "Transactions"("userId", items, "transactionType", "paymentType", "totalPrice", profit) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
                const values = [id, JSON.stringify(items), transactionType, paymentType, totalPrice, profit]
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
                console.log("Client is released");
            }
        })


    fastify.get('/transaction', {
        preValidation: [fastify.authenticate, fastify.adminAuthorization],
        schema: getTransaction
    }, async (req, reply) => {
        const { startDate, endDate } = req.query
        try {

            let formatStartDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
            let formatEndDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')

            const query = `SELECT  * from "Transactions" where "createdAt" between $1 and $2`
            const values = [formatStartDate, formatEndDate]
            console.log(values)
            const { rows } = await client.query(query, values)
            if (rows.length > 0) {
                await Promise.all(rows.map(async (tr) => {
                    const newItems = await Promise.all(tr.items.map(async (item) => {
                        const result = await client.query(`SELECT * FROM "Products" where "id" = $1`, [item.product])
                        let newData = result.rows[0]
                        let newItem = { ...item, ...newData }
                        return newItem
                    }))
                    return tr.items = newItems
                }))
            }
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