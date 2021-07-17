module.exports = {
    loginSchema: {
        description: 'login as admin / owner',
        tags: ['user'],
        body: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: ['string', 'number'] }
            }
        },
        response: {
            200: {
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
                            token: { type: 'string' },
                            createdAt: { type: 'string' },
                        }
                    }
                }
            }
        },
    },
    addAdminSchema: {
        description: 'add user as admin / owner',
        tags: ['user'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' }
            }
        },
        body: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: ['string', 'number'] },
                role: { type: 'string' },
                password: { type: 'string' },
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
    allUserSchema: {
        description: 'Get All users',
        tags: ['user'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' }
            }
        },
        response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                id: { type: 'number' },
                                role: { type: 'string' },
                                createdAt: { type: 'string' },
                                password: { type: 'string' },
                            }
                        }

                    }
                }
            }
        },
    },
    updateUserSchema: {
        description: 'Update User admin / owner',
        tags: ['user'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' }
            }
        },
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' },
            }
        },
        body: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: ['string', 'number'] },
                role: { type: 'string' },
                password: { type: 'string' },
            }
        },
        response: {
            200: {
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
}