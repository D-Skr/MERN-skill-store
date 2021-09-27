import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

//Auth user and get token
//POST /api/users/login
//Public access
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({ messsage: 'Invalid email or password' })
    }
})


//Get user profile
//GET /api/users/profile
//Private access
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Success')
    // const user = await User.findById({ req.user._id })

    // if (user && (await user.matchPassword(password))) {
    //     res.json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         isAdmin: user.isAdmin,
    //         token: generateToken(user._id)
    //     })
    // } else {
    //     res.status(401).json({ messsage: 'Invalid email or password' })
    // }
})

export { authUser, getUserProfile }