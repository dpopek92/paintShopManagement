const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const { messagesControler } = require("../contolers/messages");

/**
|--------------------------------------------------
| GET MESSAGES FOR USER
|--------------------------------------------------
*/
// @route  PUT api/messages/me
// @desc   Get messages for position
// @acces  Private
router.get("/user/:position", auth, messagesControler.get.messagesForEmployee);

/**
|--------------------------------------------------
| GET ALL MESSAGES
|--------------------------------------------------
*/
// @route  GET api/messages
// @desc   Get all messages
// @acces  Admin
router.get("/all", auth, isAdmin, messagesControler.get.allMessages);

/**
|--------------------------------------------------
| ADD NEW MESSAGE
|--------------------------------------------------
*/
// @route  PUT api/positions/addmessage
// @desc   Add new mesasge
// @acces  Private
router.post("/addmessage", auth, messagesControler.post.newMessage);

/**
|--------------------------------------------------
| SET MESSAGE READED
|--------------------------------------------------
*/
// @route  PUT api/positions/message/readed
// @desc   Set message readed
// @acces  Private
router.put(
  "/readed/:messageId",
  auth,
  messagesControler.update.setMessageReaded
);

/**
|--------------------------------------------------
| REMOVE MESSAGE
|--------------------------------------------------
*/
// @route  DELETE api/messages/remove/:messageId
// @desc   Remove message
// @acces  Admin
router.delete("/:messageId", auth, isAdmin, messagesControler.remove.message);

module.exports = router;
