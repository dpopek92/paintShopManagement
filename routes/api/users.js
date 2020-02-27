const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const {
  validateRegister,
  validateEmail,
  checkValidation
} = require("../utils/validation");

const usersControler = require("../controlers/users");

/**
|--------------------------------------------------
| REMOVE USER ACCOUNT BY OWNER
|--------------------------------------------------
*/
// @route  DELETE api/users/
// @desc   Remove user account
// @acces  Private
router.delete("/", auth, usersControler.remove.accountByUser);

/**
|--------------------------------------------------
| CHANGE USER DATA
|--------------------------------------------------
*/
// @route  PUT api/users/data
// @desc   Change user data
// @acces  Private
router.put("/data", auth, usersControler.update.data);

/**
|--------------------------------------------------
| CHANGE PASSWORD
|--------------------------------------------------
*/
// @route  PUT api/users/changepassword
// @desc   Change password
// @acces  Private
router.put("/password", auth, usersControler.update.password);

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
// +
router.post(
  "/",
  [validateRegister, checkValidation],
  usersControler.post.createNewUser
);

module.exports = router;
