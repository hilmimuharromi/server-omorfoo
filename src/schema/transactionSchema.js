module.exports = {
    addTransaction: {
        description: 'add Transaction',
        tags: ['transaction'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' }
            }
        },
        body: {
            type: 'object',
            properties: {
                paymentType: { type: 'string' },
                transactionType: { type: 'string' },
                createdAt: { type: 'string' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            product: { type: 'string' },
                            dealPrice: { type: 'number' },
                            quantity: { type: 'number' },
                        }
                    }
                }
            }
        },
        response: {
            201: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            paymentType: { type: 'string' },
                            transactionType: { type: 'string' },
                            profit: { type: 'number' },
                            createdAt: { type: 'string' },
                            items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        product: { type: 'string' },
                                        capitalPrice: { type: 'number' },
                                        dealPrice: { type: 'number' },
                                        quantity: { type: 'number' },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },


    getTransaction: {
        description: 'Get Transaction By Periode',
        tags: ['transaction'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' }
            }
        },
        querystring: {
            type: 'object',
            properties: {
                startDate: { type: 'string' },
                endDate: { type: 'string' },
            }
        },
        response: {
            201: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                paymentType: { type: 'string' },
                                transactionType: { type: 'string' },
                                profit: { type: 'number' },
                                totalPrice: { type: 'number' },
                                createdAt: { type: 'string' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number' },
                                            name: { type: 'string' },
                                            productCode: { type: 'string' },
                                            stock: { type: 'number' },
                                            minimalStock: { type: 'number' },
                                            price: { type: 'number' },
                                            capitalPrice: { type: 'number' },
                                            brand: { type: 'string' },
                                            type: { type: 'string' },
                                            createdAt: { type: 'string' },
                                            capitalPrice: { type: 'number' },
                                            dealPrice: { type: 'number' },
                                            quantity: { type: 'number' },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
}