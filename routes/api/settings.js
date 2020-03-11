const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const settingsControler = require("../controlers/settings");

/**
|--------------------------------------------------
| GET GLOBAL SETTINGS
|--------------------------------------------------
*/
// @route  GET api/settings/
// @desc   Get global settings
// @acces  Admin
router.get("/", auth, isAdmin, settingsControler.get.settings);

/**
|--------------------------------------------------
| UPDATE GLOBAL SETTINGS
|--------------------------------------------------
*/
// @route  PUT api/settings/
// @desc   Update global settings
// @acces  Admin
router.put("/", auth, isAdmin, settingsControler.update.settings);

module.exports = router;
