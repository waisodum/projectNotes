const { Router } = require("express");
const router = Router();
const { Message } = require("../models/chatmodel");
const { Chat } = require("../models/chatmodel");
const { User } = require("../models/userSchema");
const passport = require("passport");
require("../config/passport");

// Get all Messages
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }

    var isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password -posts ")
      .populate("latestMessage");
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  }
);

// Create a new Message
router.post(
  "/createMessage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var sender = req.user._id;

  // console.log(user);
  res.send('thanks')
    var { content, Chat:ChatdatA } = req.body;
    var messageData = { sender, content, Chat:ChatdatA };
try  
{    var messageData = await Message.create(messageData);
    var ChatData = await Chat.find({_id:Chat});

    ChatData.messages.push(messageData._id);
    await ChatData.save();
    res.send(ChatData.messages)}catch (error) {
  res.status(400)
    }
  }
  
);

module.exports = router;
