
const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')

const createOrder = async (req, res) => {

    const { user_id, sub_total } = req.body

    findUser = await userModel.findById(user_id)

    if (!findUser) {
        return res.status(400).send({ status: false, message: "user not found" })
    }

    req.body.phone_number = findUser.phone_number

    let orderData = await orderModel.create(req.body)
    return res.status(201).send({ status: true, message: 'new order is created', data: orderData })
}


const orderDatails = async (req, res) => {

    try {
        let user_id = req.headers.user_id

        let orderDatails = await orderModel.find({ user_id: user_id })

        return res.status(200).send({ status: true, message:'order is get successfully', data: orderDatails })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createOrder, orderDatails }



