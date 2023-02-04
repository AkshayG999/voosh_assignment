const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { isValidName, isValidPhone, isValidPass } = require('../validations/validation')


const createUser = async (req, res) => {
    try {
        let data = req.body
        const { name, phone_number, password } = req.body

        if (Object.entries(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Fill the registration information ' })
        }
        console.log(Object.values(data))

        if (!name) {
            return res.status(400).send({ status: false, message: 'Enter Full Name' })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: 'Enter Valid Name' })
        }

        if (!phone_number) {
            return res.status(400).send({ status: false, message: 'Enter phone_Number ' })
        }
        if (!isValidPhone(phone_number)) {
            return res.status(400).send({ status: false, message: 'Enter Valid Phone Number' })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: 'Enter password ' })
        }
        if (!isValidPass(password)) {
            return res.status(400).send({ status: false, message: "Password should be between 8 and 15 character and it should be alpha numeric" })
        }

        if (password) {
            let hashPassword = await bcrypt.hash(password, 10)
            data.password = hashPassword
        }

        let userdata = await userModel.findOne({ phone_number: phone_number })

        if (userdata) {
            return res.status(404).send({ status: false, message: "Phone number alredy exist" })
        }

        let result = await userModel.create(data)
        return res.status(201).send({ status: true, message: 'You are registered successfully', data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const userLogin = async (req, res) => {

    try {

        let loginData = req.body

        const { phone_number, password } = loginData

        if (Object.keys(loginData).length == 0) {
            return res.status(404).send({ status: false, message: "Enter Phone Number and Password" })
        }
        if (!phone_number) {
            return res.status(400).send({ status: false, message: 'Enter phone_Number ' })
        }
        if (!isValidPhone(phone_number)) {
            return res.status(400).send({ status: false, message: 'Enter Valid Phone Number' })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: 'Enter password ' })
        }
        if (!isValidPass(password)) {
            return res.status(400).send({ status: false, message: "Password should be between 8 and 15 character and it should be alpha numeric" })
        }

        let userdata = await userModel.findOne({ phone_number: phone_number })

        let passwordCheck = await bcrypt.compare(password, userdata.password)

        if (!passwordCheck) {
            return res.status(400).send({ status: false, message: "Incorrect Password" })
        }


        if (!userdata) {
            return res.status(404).send({ status: false, message: "User not found" })
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
        return res.status(200).send({ status: true, message: 'You are login successfully', token: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createUser, userLogin }


