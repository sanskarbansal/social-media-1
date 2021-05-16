const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const Comment = require("../../../models/Comment");
const Like = require("../../../models/Like");

router.post("/get", async (req, res) => {});
router.post("/create", (req, res) => {
    //TO BE DONE
});

router.post("/delete", (req, res) => {
    //TO BE DONE
});

module.exports = router;
