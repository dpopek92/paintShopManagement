const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { validateLogin, checkValidation } = require("../utils/validation");

const authControler = require("../controlers/auth");

// @route  GET api/auth
// @desc   Get me
// @acces  Private
// +
router.get("/", auth, authControler.get.getMe);

// @route  POST api/auth
// @desc   Authenticate user & get token
// @acces  Public
// +
router.post("/", [validateLogin, checkValidation], authControler.post.getJWT);

module.exports = router;
