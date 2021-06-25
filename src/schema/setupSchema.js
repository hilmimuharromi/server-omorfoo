module.exports = {
    dbSchema: {
        description: 'setup database',
        tags: ['setup'],
        body: {
            type: 'object',
            properties: {
                setupPassword: { type: ['string', 'number'] }
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
                            username: { type: 'string' },
                            id: { type: 'number' },
                            role: { type: 'string' },
                            token: { type: 'string' }
                        }
                    }
                }
            }
        },
    },

    userSchema: {
        description: 'setup admin / owner',
        tags: ['setup'],
        body: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            username: { type: 'string' },
                            role: { type: 'string' },
                            password: { type: ['string', 'number'] },
                        }
                    }
                },
                setupPassword: { type: ['string', 'number'] },
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
                                username: { type: 'string' },
                                role: { type: 'string' },
                                createdAt: { type: 'string' },
                            }
                        }
                    },
                }
            }
        },
    },
}