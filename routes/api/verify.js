const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { verifyControler } = require("../contolers/verify");

// @route  POST api/verify/resend
// @desc   Resend verify link
// @acces  Public
router.get("/resend", auth, verifyControler.get.sendVerifyLink);

// @route  PUT api/verify/userId
// @desc   activate user account
// @acces  Private
router.get("/:userId", verifyControler.get.activateUserAccount);

module.exports = router;
