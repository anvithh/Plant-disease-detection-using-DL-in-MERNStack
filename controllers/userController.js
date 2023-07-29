const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//REGISTER ENDPOINT
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered!")
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 5)
    console.log("Hashed password is:", hashedPassword)

    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword
        }
    )
    console.log(`Created user details: ${user}`)
    if (user) {
        res.status(201).json({ Iid: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User data was not valid")
    }

    res.json({ message: "User registration" })
})




//LOGIN ENDPOINT
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400)
        throw new Error("All fields mandatory")
    }

    const user = await User.findOne({ username })

    //Compare password with hashed
    if (user && (await bcrypt.compare(password, user.password))) {
        try {
            const token = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "25m" }
            )
            res.status(200).json({ token })
        } catch (error) {
            res.status(401)
        throw new Error("Username or password invalid")
        }
    } else {
        res.status(401)
        throw new Error("Username or password invalid")
    }

    res.json({ message: "User Login" })
})

//current user
//private
//token has to be passed
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


module.exports = { registerUser, loginUser, currentUser }