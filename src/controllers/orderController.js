
const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const { isValidPhone } = require('../validations/validation')

const createOrder = async (req, res) => {

    const { user_id, sub_total, phone_number } = req.body

      if(!sub_total){
        return res.status(400).send({ status: false, message: "Enter sub_total" })
      }

    if (!isValidPhone(phone_number)) {
        return res.status(400).send({ status: false, message: "Enter Valid Phone Number" })
    }

    findUser = await userModel.findById(user_id)

    if (!findUser) {
        return res.status(400).send({ status: false, message: "User Not Found" })
    }

    if (findUser.phone_number !== phone_number) {
        return res.status(400).send({ status: false, message: "Enter Your Register Phone Number" })
    }
    // req.body.phone_number = findUser.phone_number

    let orderData = await orderModel.create(req.body)
    return res.status(201).send({ status: true, message: 'New Order Is Created', data: orderData })
}


const orderDatails = async (req, res) => {

    try {
        let user_id = req.headers.user_id

        let orderDatails = await orderModel.find({ user_id: user_id })

        return res.status(200).send({ status: true, message: 'Order is get successfully', data: orderDatails })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createOrder, orderDatails }



