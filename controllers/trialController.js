//Without writing try-catch blocks, we are able to handle all the errors
const asyncHandler = require("express-async-handler")
const User = require("../models/user")

//GET SINGLE ENTITY
const getTrial = asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id)
    if (!users) {
        res.status(404);
        throw new Error("User not found!")
    }
    res.status(200).json(users)
})


//GET ALL ENTITIES
const getTrials = asyncHandler(async (req, res) => {
    const users = await User.find({ user_id: req.user.id })
    res.status(200).json(users)
})



//CREATE OPERATION
const postTrial = asyncHandler(async (req, res) => {
    console.log("The Request Body is", req.body)
    const { username, name, email, password } = req.body
    if (!username || !password) {
        res.status(400);
        throw new Error("ALL FIELDS MANDARTORY!!!!")
    }
    const userEntity = await User.create({
        username, name, email, password, user_id: req.user.id
    })
    res.status(201).json(userEntity)
})


//UPDATE OPERATION
const putTrial = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error("User not found!")
    }

    if(user.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User not authorized to update another user's contact!")
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } 
    )
    res.status(200).json(updatedUser)
})


//DELETE OPERATION
const deleteTrial = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error("User not found!")
    }

    if(user.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User not authorized to delete another user's contact!")
    }

    await user.deleteOne({ _id: req.params.id })
    res.status(200).json(user)
})
module.exports = { getTrial, getTrials, postTrial, putTrial, deleteTrial }