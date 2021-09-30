import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//Create new order
//POST /api/orders
//Private access
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ messsage: 'No order items' })
    } else {
        const order = new Order({ orderItems, user: req.user._id, paymentMethod, itemsPrice, taxPrice, totalPrice })
        const createdOrder = await order.save()
        res.status(201).json({ messsage: 'Order created' })
    }
})

export { addOrderItems }