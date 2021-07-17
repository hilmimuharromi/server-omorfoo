const fastify = require("fastify");
const authentication = require("./plugins/authentication")
const authorization = require('./plugins/authorization')
const keysToCamel = require('./plugins/keysToCamel')
const userRoutes = require('./routes/userRoutes')
const setupRoutes = require('./routes/setupRoutes')
const productRoutes = require('./routes/productRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
// const connectionDB = require('./plugins/connectDb')
const bcrypt = require('./plugins/bcrypt')
const dotenv = require('./plugins/dotenv')
const dbConnector = require('./plugins/db')
const app = fastify({
    logger: {
        prettyPrint: {
            translateTime: 'SYS:dd-mm-yyyy hh:MM:ss',
            colorize: true,
        }
    }
})

app.register(dbConnector)
app.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'omorfoo-api' },
        // Add more options to get a nicer page ✨
    },
})


// authorization(app)
app.register(authorization)
app.register(authentication)
app.register(keysToCamel)
app.register(dotenv)
// app.register(connectionDB)
app.register(bcrypt)
app.register(userRoutes)
app.register(setupRoutes)
app.register(transactionRoutes)
app.register(productRoutes)


// authentication(app)
app.addHook('preHandler', function (req, reply, next) {
    if (req.body && req.url !== '/login') {
        req.log.info({ body: req.body }, 'parsed body')
    }
    next()
})
//handle root route


app.listen(5000, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running on ${address} `);
});