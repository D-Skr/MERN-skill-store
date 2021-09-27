import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        console.log('token found')
    }

    else if (!token) {
        res.status(401).json({ messsage: 'Not authorized, no token' })
    }

    next()
})

export { protect }