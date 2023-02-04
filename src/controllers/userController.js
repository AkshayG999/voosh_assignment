const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        let data = req.body
        const { name, phone_number, password } = req.body

        // console.log(req.body)
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Fill the registration information '})
        }

        let userdata = await userModel.findOne({ phone_number: phone_number })

        if (userdata) {
            return res.status(404).send({ status: false, message: "phone number alredy exist" })
        }

        if (!name) {
            return res.status(400).send({ status: false, message: 'Enter name ' })
        }

        if (!phone_number) {
            return res.status(400).send({ status: false, message: 'Enter phone_Number ' })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: 'Enter password ' })
        }
        if (password) {
            let hashPassword = await bcrypt.hash(password, 10)
            data.password = hashPassword
        }

        let result = await userModel.create(data)
        return res.status(201).send({ status: true, message: 'you are registered successfully', data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const userLogin = async (req, res) => {

    try {

        let loginData = req.body
        
        const { phone_number, password } = loginData


        let userdata = await userModel.findOne({ phone_number: phone_number })
        
        if (!userdata) {
            return res.status(404).send({ status: false, message: "User not found" })
        }

        let passwordCheck = await bcrypt.compare(password, userdata.password)
        
        if (!passwordCheck) {
            return res.status(400).send({ status: false, message: "Invalid Password" })
        }

        let token = jwt.sign(
            {
                userId: userdata._id,
                name: userdata.name,
                phone_number: phone_number,
            },
            "sdfghjujnwefg",
            { expiresIn: "24h" }
        )
        return res.status(200).send({ status: true, message: 'you are login successfully', token: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { createUser, userLogin }


