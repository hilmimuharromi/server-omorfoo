const User = require('../models/user')
const { verifyPassword } = require('../helpers/hash')
const Register = async (req, reply) => {
    console.log('register masuk', req.body)
    try {
        const { name, email, password, role } = req.body
        const result = await User.create({
            name, email, password, role
        })
        reply.code(201).send(result)
    } catch (error) {
        reply.code(400).send(error)
    }
}

const Login = async (req, reply) => {
    console.log('login masuk', req.body)

    try {
        const { email, password } = req.body
        const findUser = await User.findOne({ email })
        if (findUser) {
            console.log(findUser)
            const isVerif = verifyPassword(password, findUser.password)
            if (isVerif) {
                const token = await reply.jwtSign({ user: findUser })
                reply.code(201).send({ token })
            } else {
                reply.code(400).send('failed login')
            }

        }

    } catch (error) {
        console.log('error ====>', error)
        reply.code(400).send(error)

    }

}

module.exports = {
    Register, Login
}