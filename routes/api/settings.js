const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const settingsControler = require("../contolers/settings");

// @route  GET api/settings
// @desc   Get global settings
// @acces  Private
router.get("/", auth, settingsControler.get.globalSettings);

// @route  GET api/settings/realizationdates
// @desc   Get global realization dates
// @acces  Private
router.get("/realizationdates", auth, settingsControler.get.realizationDates);

// @route  GET api/settings/paintmakers
// @desc   Get global paintmakers
// @acces  Private
router.get("/paintmakers", auth, settingsControler.get.paintMakers);

// @route  PUT api/settings
// @desc   Set global prices
// @acces  Admin
router.put("/", auth, isAdmin, settingsControler.update.globalSettings);

module.exports = router;
