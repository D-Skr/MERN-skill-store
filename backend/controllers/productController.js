import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//Fetch all products
//GET /api/products
//Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})


//Fetch one product
//GET /api/products/:id
//Public
const getProductById = asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ messsage: 'Product not found' })
    }
})

export {
    getProducts,
    getProductById
}