const express = require("express");
const User = require("../../../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { firstName, lastName, username, password, mobileNumber, email } = req.body;
    let user = await User.findOne({ $or: [{ username }, { mobileNumber }, { email }] });
    if (user) {
        return res.status(404).json({
            error: "USERNAME ALREADY EXISTS",
        });
    }
    user = await User.create({ ...req.body });
    if (user)
        return res.status(200).json({
            message: "USER CREATED SUCCESSFULLY",
        });
    res.json(404, {
        error: "ERROR WHILE CREATING USER",
    });
});
router.post("/login", async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ $or: [{ username }, { email }] });
    console.log(user);
    if (!user || user.password != password)
        return res.status(403).json({
            error: "WRONG EMAIL/PASSWORD",
        });

    const token = jwt.sign(JSON.stringify(user), process.env.SECRETE_KEY);
    res.status(200).json({
        token,
    });
});

module.exports = router;
