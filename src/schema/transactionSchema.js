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
        query: {
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
            }
        },
    },
}