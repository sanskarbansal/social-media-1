const mongoose = require("mongoose");

const Post = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment",
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "like",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("post", Post);
