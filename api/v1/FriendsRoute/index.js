const express = require("express");
const router = express.Router();
const Friendship = require("../../../models/Friendship");
const User = require("../../../models/User");

router
    .route("/")
    .post(async (req, res) => {
        const { friendId } = req.body;
        if (!friendId || friendId.length !== 24) {
            return res.json({ error: "PLEASE PROVIDE A CORRECT FRIEND ID." });
        }
        const Friend = await User.findById(friendId);
        if (!Friend) {
            return res.json({
                error: "NO SUCH USER FOUND",
            });
        }
        Friendship.create({
            sender: req.user._id,
            reciever: friendId,
        });
        return res.json({
            message: "Friend Request sent.",
        });
    })
    .get(async (req, res) => {
        const FriendRequests = await Friendship.find({ reciever: req.user._id }).populate({
            path: "sender",
            select: "firstName lastName username",
        });
        return res.json({
            FriendRequests,
        });
    });
router.post("/accept", async (req, res) => {
    //TO BE DONE LATER
    const { FriendRequestId } = req.body;
    if (!FriendRequestId || FriendRequestId.length !== 24) {
        return res.json({ error: "PLEASE PROVIDE A CORRECT FRIEND Request Id." });
    }
    const friendRequest = await Friendship.findById(FriendRequestId);
    if (!friendRequest) return res.json({ error: "NO SUCH FRIEND REQUEST FOUND" });
    friendRequest.status = 1;
    friendRequest.save();
    if (friendRequest.reciever != req.user._id)
        return res.status(403).json({
            error: "YOU ARE NOT PERMITTED TO DO THIS",
        });

    const reciever = await User.findById(req.user._id);
    const sender = await User.findById(friendRequest.sender);
    reciever.friends.push(sender);
    sender.friends.push(reciever);
    await reciever.save();
    await sender.save();
    return res.json({
        message: "FRIEND REQUEST ACCEPTS",
    });
});

module.exports = router;
// .get((req, res) => {});
