'use strict'

const fp = require('fastify-plugin')
const bcrypt = require('bcryptjs')

module.exports = fp(function (fastify, opts, next) {
    const saltWorkFactor = opts.saltWorkFactor || 10
    const hash = async pwd => bcrypt.hash(`${pwd}`, saltWorkFactor)
    const compare = async (password, hash) => bcrypt.compareSync(`${password}`, `${hash}`)

    fastify
        .decorate('bcrypt', {
            hash,
            compare
        })
        .decorateRequest('bcryptHash', hash)
        .decorateRequest('bcryptCompare', compare)

    next()
})