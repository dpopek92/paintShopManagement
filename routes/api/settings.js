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

module.exports = router;
