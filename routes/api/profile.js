const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const { validateEmail, checkValidation } = require("../utils/validation");

const profileControler = require("../contolers/profile");

/**
|--------------------------------------------------
| GET CURRENT USER PROFILE
|--------------------------------------------------
*/
// @route  GET api/profile/me
// @desc   Get current user profile
// @acces  Private
router.get("/me", auth, profileControler.get.currentUser);

/**
|--------------------------------------------------
| GET ALL USERS
|--------------------------------------------------
*/
// @route  GET api/profile/users
// @desc   Get all users
// @acces  Admin
router.get("/users", auth, isAdmin, profileControler.get.allUsers);

/**
|--------------------------------------------------
| GET USER PROFILE BY ID
|--------------------------------------------------
*/
// @route  GET api/profile/users/:user_id
// @desc   Get profile by user id
// @acces  Admin
router.get("/users/:userId", auth, isAdmin, profileControler.get.userProfile);

/**
|--------------------------------------------------
| UPDATE USER PROFILE
|--------------------------------------------------
*/
// @route  PUT api/profile
// @desc   Update user profile
// @acces  Private
router.put(
  "/",
  auth,
  [validateEmail, checkValidation],
  profileControler.update.currentProfile
);

/**
|--------------------------------------------------
| CHANGE USER PASSWORD
|--------------------------------------------------
*/
// @route  PUT api/profile/password
// @desc   Change user password
// @acces  Private
router.put("/password", auth, profileControler.update.password);

/**
|--------------------------------------------------
| CHANGE USER PASSWORD BY ACCOUNT RECOVER
|--------------------------------------------------
*/
// @route  PUT api/profile/passwordrecover/:userId
// @desc   Change user password by account recover
// @acces  Private
router.put(
  "/passwordrecover/:userId",
  profileControler.update.passwordByAccountRecover
);

/**
|--------------------------------------------------
| ADD USER SUBORDINATES
|--------------------------------------------------
*/
// @route  PUT api/subordinates/:customerId
// @desc   Update user profile
// @acces  Admin
router.put(
  "/subordinates/:userId",
  auth,
  isAdmin,
  profileControler.update.subordinates
);

/**
|--------------------------------------------------
| SET USER DISCOUNTS
|--------------------------------------------------
*/
// @route  PUT api/profile/user/:userId
// @desc   Set user discounts by his id
// @acces  Admin
router.put(
  "/user/discounts/:userId",
  auth,
  isAdmin,
  profileControler.update.discounts
);

/**
|--------------------------------------------------
| DELETE USER PROFILE (SURNAME, EMAIL, PASSWORD)
|--------------------------------------------------
*/
// @route  DELETE api/profile/user/me
// @desc   Delete surname, email, password
// @acces  Private
router.delete("/user/me", auth, profileControler.remove.currentUser);

/**
|--------------------------------------------------
| DELETE USER AND HIS ORDERS
|--------------------------------------------------
*/
// @route  DELETE api/profile/user/:user_id
// @desc   Delete orders, profile and user by id
// @acces  Admin
router.delete(
  "/user/:userId",
  auth,
  isAdmin,
  profileControler.remove.userProfile
);

module.exports = router;
