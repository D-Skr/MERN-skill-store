import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//Create new order
//POST /api/orders
//Private access
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ messsage: 'No order items' })
        return
    } else {
        const order = new Order({ orderItems, user: req.user._id, paymentMethod, itemsPrice, taxPrice, totalPrice })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//Get order by ID
//GET /api/orders/:id
//Private access
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404).json({ messsage: 'Order not found' })
    }
    // const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body

    // if (orderItems && orderItems.length === 0) {
    //     res.status(400).json({ messsage: 'No order items' })
    // } else {
    //     const order = new Order({ orderItems, user: req.user._id, paymentMethod, itemsPrice, taxPrice, totalPrice })
    //     const createdOrder = await order.save()
    //     res.status(201).json({ messsage: 'Order created' })
    // }
})

//Update order to paid
//GET /api/orders/:id/pay
//Private access
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404).json({ messsage: 'Order not found' })
    }
})

//Get user orders
//GET /api/orders/myorders
//Private access
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }