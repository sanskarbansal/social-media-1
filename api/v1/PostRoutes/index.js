const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const Comment = require("../../../models/Comment");
const Like = require("../../../models/Like");

router.get("/get", async (req, res) => {
    let posts = await Post.find({});
    if (!posts)
        return res.status(404).json({
            error: "ERROR WHILE FETCHING POSTS.",
        });
    res.status(200).json({
        ...posts,
    });
});
router.post("/create", async (req, res) => {
    const { body } = req.body;
    const { _id } = req.user;
    let post = await Post.create({ user: _id, body });
    if (!post)
        return res.status(404).json({
            error: "ERROR OCCURRED WHILE CREATING A POST!",
        });
    res.status(200).json({
        ...post._doc,
    });
});

router.post("/delete", async (req, res) => {
    const { postId } = req.body;
    if (!postId || postId.length != 24)
        return res.json({
            error: "PLEASE DON'T MANIPULATE SOMETHING",
        });
    let post = await Post.findById(postId);
    if (!post || post.user != req.user._id)
        return res.status(403).json({
            error: "YOU ARE NOT AUTHORISED TO PERFORM THIS ACTION.",
        });

    Post.findByIdAndDelete(postId, (err) => {
        if (err)
            return res.json({
                error: "ERROR WHILE DELETING LIKES OF POST",
            });
    });
    Comment.deleteMany({ post: postId }, (err) => {
        if (err)
            return res.json({
                error: "ERROR WHILE DELETING COMMENTS OF POST",
            });
    });
    Like.deleteMany({ likeOf: "post", likeable: postId }, (err) => {
        if (err)
            return res.json({
                error: "ERROR WHILE DELETING LIKES OF POST",
            });
    });
    return res.json({
        message: "POST DELETED SUCCESFULLY",
    });
});

module.exports = router;
