const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: "User"
    },
    username: {
        type: String,
        required: [true, "Required"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Required"]
    },
    email: {
        type: String,
        required: [true, "Required"]
    },
    password: {
        type: String,
        required: [true, "Required"]
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Users", userSchema)
