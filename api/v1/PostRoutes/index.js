const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const Comment = require("../../../models/Comment");
const Like = require("../../../models/Like");

//Get Comments of a perticular post
router.get("/get", async (req, res) => {
    let posts = await Post.find({})
        .populate({
            path: "comments",
            select: "user likes body",
            populate: {
                path: "likes user",
                select: "firstName lastName  user",
                populate: {
                    path: "user",
                    select: "firstName lastName",
                },
            },
        })
        .populate({ path: "user", select: "firstName lastName " })
        .populate({ path: "likes", select: "user", populate: { path: "user", select: "firstName lastName" } });
    // .populate({ path: "comments", populate: { path: "user" } })
    // .populate({ path: "comments", populate: { path: "likes" } })
    // .populate({ path: "likes", populate: { path: "user" } });
    if (!posts)
        return res.status(404).json({
            error: "ERROR WHILE FETCHING POSTS.",
        });
    res.status(200).json({
        ...posts,
    });
});

//Create a post;
router.post("/create", async (req, res) => {
    const { body } = req.body;
    let post = await Post.create({ user: req.user._id, body });
    post = await post.populate({ path: "user", select: "firstName lastName username" }).execPopulate();
    if (!post)
        return res.status(404).json({
            error: "ERROR OCCURRED WHILE CREATING A POST!",
        });
    res.status(200).json({
        ...post._doc,
    });
});

//Delete a post
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
    await post.remove(); //Likes and Comments associated with this post are deleted in pre("remove") hook, in mongoose middleware
    return res.json({
        message: "POST DELETED SUCCESFULLY",
    });
});

module.exports = router;
