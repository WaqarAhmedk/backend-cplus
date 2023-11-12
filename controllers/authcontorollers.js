const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../constansts');




exports.create = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        const exsistingUer = await User.findOne({ where: { email: data.email } })
        if (exsistingUer) {
            return res.send({
                message: 'User with this Email already exist'
            })
        }
        const saltRounds = 10;
        const hash = bcrypt.hashSync(data.password, saltRounds);
        data.password = hash

        const newuser = await User.create(data)


        res.send({
            message: 'New User   Created Succesfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

}
exports.signin = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
        }

        const existingUser = await User.findOne({ where: { email: data.email } })
        if (!existingUser) {
            return res.status(403).send({
                message: 'No User found with this Email'
            })
        }


        const valid = bcrypt.compareSync(data.password, existingUser.password);
        if (!valid) {
            return res.status(403).send({ message: 'You Provided wrong credentials' })
        }



        const { password, ...sanitizedUser } = existingUser;

        const token = jwt.sign({ id: existingUser.id }, SECRET);

        res.send({
            message: 'Logged in successfully',
            user: sanitizedUser,
            token: token,
        });


    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

}
exports.view = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        const exsistingUer = await User.findOne({ where: { email: data.email } })
        if (exsistingUer) {
            return res.send({
                message: 'User with this Email already exist'
            })
        }
        const saltRounds = 10;
        const hash = bcrypt.hashSync(data.password, saltRounds);
        data.password = hash

        const newuser = await User.create(data)


        res.send({
            message: 'New User   Created Succesfully',
        })
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

}