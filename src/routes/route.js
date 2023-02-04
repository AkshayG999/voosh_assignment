const express = require("express")
const router = express.Router()
const { createUser, userLogin } = require('../controllers/userController')
const { createOrder, orderDatails } = require('../controllers/orderController')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')


router.post('/add-user', createUser)
router.post('/login-user', userLogin)


router.post('/add-order', authentication, authorization,  createOrder)
router.get('/get-order', authentication, authorization, orderDatails)


module.exports = router