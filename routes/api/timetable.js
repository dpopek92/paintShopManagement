const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const { timetableControler } = require("../contolers/timetable");

// @route  GET api/timetable/
// @desc   Get all positions timetables
// @acces  Admin
router.get("/", auth, isAdmin, timetableControler.get.allPositions);

// @route  GET api/timetable/:position
// @desc   Get timetable for position
// @acces  Admin/Employee
router.get("/:position", auth, timetableControler.get.position);

// @route  PUT api/timetable/
// @desc   Update day on position
// @acces  Admin
router.put("/", auth, isAdmin, timetableControler.update.dayOnPosition);

// @route  PUT api/timetable/addorder
// @desc   Add order to timetables
// @acces  Admin
router.put("/addorder", auth, isAdmin, timetableControler.update.addOrder);

// @route  PUT api/timetable/editorder
// @desc   Edit order in timetables
// @acces  Admin
router.put("/editorder", auth, isAdmin, timetableControler.update.editOrder);

// @route  PUT api/timetable/addorder
// @desc   Remove order from timetables (transport)
// @acces  Admin/Employee
router.put("/removeorder", auth, timetableControler.update.removeOrder);

//TEMPORARY

// @route  POST api/timetable/
// @desc   Create timetables
// @acces  Public
router.get("/script/create", timetableControler.post.createTimetable);

// @route  GET api/timetable/nextday
// @desc   Update day on position
// @acces  Public
router.get("/script/nextday", timetableControler.update.nextDay);

module.exports = router;
