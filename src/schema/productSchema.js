module.exports = {
    addProduct: {
        description: 'add product',
        tags: ['product'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                productCode: { type: 'string' },
                stock: { type: 'number' },
                minimalStock: { type: 'number' },
                price: { type: 'number' },
                capitalPrice: { type: 'number' },
                brand: { type: 'string' },
                type: { type: 'string' }
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
                        }
                    }
                }
            }
        },
    },

    uploadProducts: {
        description: 'upload products',
        tags: ['product'],
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string' },
            }
        },
        consumes: ['multipart/form-data'],
        body: {
            type: 'string',
            properties: {
                myField: { $ref: '#mySharedSchema' },
            },
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
                        }
                    }
                }
            }
        },

    },

    updateProduct: {
        description: 'Update product',
        tags: ['product'],
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
                name: { type: 'string' },
                productCode: { type: 'string' },
                stock: { type: 'number' },
                minimalStock: { type: 'number' },
                price: { type: 'number' },
                capitalPrice: { type: 'number' },
                brand: { type: 'string' },
                type: { type: 'string' },
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
                            name: { type: 'string' },
                            productCode: { type: 'string' },
                            stock: { type: 'number' },
                            minimalStock: { type: 'number' },
                            price: { type: 'number' },
                            capitalPrice: { type: 'number' },
                            brand: { type: 'string' },
                            type: { type: 'string' },
                            createdAt: { type: 'string' },
                        }
                    }
                }
            }
        },
    },

    deleteProduct: {
        description: 'Delete product',
        tags: ['product'],
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
        response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            productCode: { type: 'string' },
                            stock: { type: 'number' },
                            minimalStock: { type: 'number' },
                            price: { type: 'number' },
                            capitalPrice: { type: 'number' },
                            brand: { type: 'string' },
                            type: { type: 'string' },
                            createdAt: { type: 'string' },

                        }
                    }
                }
            }
        },
    },

    getAllProduct: {
        description: 'Get All product',
        tags: ['product'],
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

                            }
                        }
                    }
                }
            }
        },
    },
}