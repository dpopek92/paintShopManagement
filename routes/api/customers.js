const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const { validateEmail, checkValidation } = require("../utils/validation");

const customersControler = require("../controlers/customers");

/**
|--------------------------------------------------
| REMOVE CUSTOMER ACCOUNT PERM
|--------------------------------------------------
*/
// @route  DELETE api/customers/:userId
// @desc   Remove customer account permamently
// @acces  Private
router.delete(
  "/:userId",
  auth,
  isAdmin,
  customersControler.remove.accountByAdmin
);

/**
|--------------------------------------------------
| GET CURRENT USER PROFILE
|--------------------------------------------------
*/
// @route  GET api/customers/me
// @desc   Get current user profile
// @acces  Private
router.get("/me", auth, customersControler.get.currentProfile);

/**
|--------------------------------------------------
| GET ALL CUSTOMERS
|--------------------------------------------------
*/
// @route  GET api/customers/all
// @desc   Get all users
// @acces  Admin
router.get("/all", auth, isAdmin, customersControler.get.allCustomers);

/**
|--------------------------------------------------
| GET USER PROFILE BY ID
|--------------------------------------------------
*/
// @route  GET api/customers/customerId
// @desc   Get profile by user id
// @acces  Admin
router.get(
  "/customerId",
  auth,
  isAdmin,
  customersControler.get.customerProfile
);

/**
|--------------------------------------------------
| UPDATE CUSTOMER DISCOUNTS
|--------------------------------------------------
*/
// @route  PUT api/customers/discounts/customerId
// @desc   Update customer discounts
// @acces  Admin
router.put(
  "/discounts/:customerId",
  auth,
  isAdmin,
  customersControler.update.discounts
);

module.exports = router;
