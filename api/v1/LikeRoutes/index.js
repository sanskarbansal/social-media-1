const express = require("express");
const Router = express.Router();
const Like = require("../../../models/Like.js");
const Comment = require("../../../models/Comment.js");
const Post = require("../../../models/Post.js");

Router.post("/toggle", async (req, res) => {
    const { likeOfId } = req.body;
    if (!likeOfId || likeOfId.length != 24)
        return res.json({
            error: "PLEASE PROVIDE ID.",
        });
    let likeable,
        likeOf,
        deleted = false;
    likeable = await Post.findById(likeOfId);
    if (likeable) likeOf = "post";

    if (!likeOf) {
        likeable = await Comment.findById(likeOfId);
        likeOf = "comment";
    }

    if (!likeOf)
        return res.json({
            error: "NO SUCH POST/COMMENT FOUND",
        });

    let like = await Like.findOne({
        user: req.user._id,
        likeable: likeOfId,
        likeOf,
    });
    if (like) {
        await likeable.likes.pull(like._id);
        like.remove();
        likeable.save();
        deleted = true;
    } else {
        like = await Like.create({
            likeable: likeOfId,
            likeOf,
            user: req.user._id,
        });
        await likeable.likes.push(like._id);
        likeable.save();
    }
    return res.json({
        message: "LIKE TOGGLED SUCCESSFULLY",
        deleted,
    });
});

module.exports = Router;
