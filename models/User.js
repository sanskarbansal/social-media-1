const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            default: "India",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", User);
