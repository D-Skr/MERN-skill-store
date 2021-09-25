import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//Fetch all products
//GET /api/products
//Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))

//Fetch one product
//GET /api/products/:id
//Public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ messsage: 'Product not found' })
    }
}))


export default router