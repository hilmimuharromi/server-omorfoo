

const addProduct = () => {
    reply.code(201).send('masuk add product')
}

const getProducts = () => {
    reply.code(201).send('masuk get product')
}

const getProductbyQuery = async (req, reply) => {
    reply.code(201).send('masuk get product by query')
}

const updateProduct = async (req, reply) => {
    const { id } = req.params
    reply.code(201).send('masuk update product', id)

}

const deleteProduct = async (req, reply) => {
    const { id } = req.params
    reply.code(201).send('masuk delete product', id)

}

module.exports = {
    addProduct, getProducts, getProductbyQuery, updateProduct, deleteProduct
}