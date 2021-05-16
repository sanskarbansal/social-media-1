const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const Comment = require("../../../models/Comment");
const Like = require("../../../models/Like");

router.post("/get", async (req, res) => {
    const { postId } = req.body;
    if (!postId || postId.length != 24)
        return res.json({
            error: "ERROR WHILE FETCHING COMMENTS, MAYBE INVALID POST ID",
        });
    let comments = await Comment.find({ post: postId });
    if (!comments)
        return res.json({
            error: "NO COMMENTS FOUND RELATED TO THIS POST ID",
        });
    res.json({
        comments,
    });
});
router.post("/create", async (req, res) => {
    const { postId, body } = req.body;
    if (!postId || !body || postId.length != 24)
        return res.json({
            error: "ERROR WHILE CREATING COMMENT",
        });
    let post = await Post.findById(postId);
    if (!post)
        return res.json({
            error: "NO POST FOUND ON WHICH USER IS COMMENTING",
        });
    let comment = await Comment.create({ post: postId, user: req.user._id, body });
    if (!comment)
        return res.json({
            error: "ERROR WHILE CREATING COMMENT",
        });
    res.json({
        message: "COMMENT CREATED SUCCESSFULLY",
    });
});

router.post("/delete", (req, res) => {
    //TO BE DONE
});

module.exports = router;
