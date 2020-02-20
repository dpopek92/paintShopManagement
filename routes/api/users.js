const express = require("express");
const router = express.Router();
const {
  validateRegister,
  validateEmail,
  checkValidation
} = require("../utils/validation");

const usersControler = require("../contolers/users");

/**
|--------------------------------------------------
| REMIND PASSWORD
|--------------------------------------------------
*/
// @route  POST api/users/remindpassword
// @desc   Remind password
// @acces  Public
router.post(
  "/remindpassword",
  [validateEmail, checkValidation],
  usersControler.post.remindPassword
);

/**
|--------------------------------------------------
| REGISTER USER AND CREATE PROFILE
|--------------------------------------------------
*/
// @route  POST api/users
// @desc   Register user and create profile
// @acces  Public
router.post(
  "/",
  [validateRegister, checkValidation],
  usersControler.post.createNewUser
);

module.exports = router;
