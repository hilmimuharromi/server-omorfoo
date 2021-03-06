const fp = require('fastify-plugin')



module.exports = fp(function (fastify, opts, next) {

    const toCamel = (s) => {
        return s.replace(/([-_][a-z])/ig, ($1) => {
            return $1.toUpperCase()
                .replace('-', '')
                .replace('_', '');
        });
    };

    const isArray = function (a) {
        return Array.isArray(a);
    };

    const isObject = function (o) {
        return o === Object(o) && !isArray(o) && typeof o !== 'function';
    };

    const keysToCamel = function (o) {
        console.log('dari key camel   ====>', o)
        if (isObject(o)) {
            const n = {};

            Object.keys(o)
                .forEach((k) => {
                    n[toCamel(k)] = keysToCamel(o[k]);
                });

            return n;
        } else if (isArray(o)) {
            return o.map((i) => {
                return keysToCamel(i);
            });
        }

        return o;
    };


    fastify.decorate("keysToCamel", keysToCamel)
    next()
})

