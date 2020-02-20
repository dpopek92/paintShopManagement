const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const { statsControler } = require("../contolers/stats");

// @route  GET api/stats/productionyears
// @desc   Get available years from production stats
// @acces  Admin
router.get(
  "/productionyears",
  auth,
  isAdmin,
  statsControler.get.productionYears
);

// @route  GET api/stats/employeeyears/:employeeId
// @desc   Get available years from employee stats
// @acces  Admin
router.get(
  "/employeeyears/:employeeId",
  auth,
  isAdmin,
  statsControler.get.employeeYears
);

// @route  POST api/stats/production
// @desc   Get prodcution stats by year & month
// @acces  Admin
router.post(
  "/production",
  auth,
  isAdmin,
  statsControler.get.productionStatsByDate
);

// @route  POST api/stats/employee/:employeeId
// @desc   Get employee stats by year & month
// @acces  Admin
router.post(
  "/employee/:employeeId",
  auth,
  isAdmin,
  statsControler.get.employeeStatsByDate
);

// @route  POST api/stats/production/summary
// @desc   Get prodcution summary by year & month
// @acces  Admin
router.post(
  "/production/summary",
  auth,
  isAdmin,
  statsControler.get.productionMonthSummary
);

// @route  POST api/stats/customer/month
// @desc   Get get prodcution summary by year & month
// @acces  Admin
router.post(
  "/customer/month",
  auth,
  isAdmin,
  statsControler.get.customerMonthSummary
);

// @route  POST api/stats/customer/year
// @desc   Get get prodcution summary by year
// @acces  Admin
router.post(
  "/customer/year",
  auth,
  isAdmin,
  statsControler.get.customerYearSummary
);

// @route  POST api/stats/employees/workedhours
// @desc   Get employee worked hours by year & month
// @acces  Admin
router.post(
  "/employees/workedhours",
  auth,
  isAdmin,
  statsControler.get.employeeWorkedHours
);

// @route  PUT api/stats/employees/workedhours
// @desc   Update employee worked hours by year & month
// @acces  Admin
router.put(
  "/employees/workedhours",
  auth,
  isAdmin,
  statsControler.update.employeeWorkedHours
);

module.exports = router;
