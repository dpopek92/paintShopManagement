const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const pricesControler = require("../contolers/prices");

// @route  GET api/prices/
// @desc   Get global prices
// @acces  Private
router.get("/", auth, pricesControler.get.globalPrices);

// @route  PUT api/prices
// @desc   Set global prices
// @acces  Private
router.put("/", auth, isAdmin, pricesControler.update.globalPrices);

module.exports = router;
