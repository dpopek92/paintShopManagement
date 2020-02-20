const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const {
  validateAddEmployee,
  validateUpdateEmployee,
  checkValidation
} = require("../utils/validation");

const employeeControler = require("../contolers/employee");

/**
|--------------------------------------------------
| GET ALL EMPLOYEES
|--------------------------------------------------
*/
// @route  GET api/employee
// @desc   Get all employee
// @acces  Private
router.get("/", auth, isAdmin, employeeControler.get.allEmployees);

/**
|--------------------------------------------------
| GET EMPLOYEE BY ID
|--------------------------------------------------
*/
// @route  GET api/employee/:id
// @desc   Get employee by id
// @acces  Private
router.get("/:employeeId", auth, employeeControler.get.employeeProfile);

/**
|--------------------------------------------------
| GET POSITION EMPLOYEES
|--------------------------------------------------
*/
// @route  GET api/employee/employees/:position
// @desc   Get position employee
// @acces  Private
router.get(
  "/employees/:position",
  auth,
  employeeControler.get.positionEmployees
);

/**
|--------------------------------------------------
| ADD A NEW EMPOYEE
|--------------------------------------------------
*/
// @route  POST api/employee
// @desc   Add a new employee
// @acces  Admin
router.post(
  "/",
  auth,
  isAdmin,
  [validateAddEmployee, checkValidation],
  employeeControler.post.newEmployee
);

/**
|--------------------------------------------------
| UPDATE EMPLOYEE PROFILE
|--------------------------------------------------
*/
// @route  CHANGE api/employee/:id/profile
// @desc   Update employee profile
// @acces  Private
router.put(
  "/:id/profile",
  auth,
  [validateUpdateEmployee, checkValidation],
  employeeControler.update.currentProfile
);

/**
|--------------------------------------------------
| CHANGE EMPLOYEE PASSWORD
|--------------------------------------------------
*/
// @route  PUT api/employee/password
// @desc   Change employee password
// @acces  Private
router.put("/password", auth, employeeControler.update.password);

/**
|--------------------------------------------------
| CHANGE EMPLOYEE POSITION
|--------------------------------------------------
*/
// @route  CHANGE api/employee/:id/position
// @desc   change employee position
// @acces  Admin
router.put(
  "/:employeeId/position",
  auth,
  isAdmin,
  employeeControler.update.positions
);

/**
|--------------------------------------------------
| UPDATE EMPLOYEE EARNINGS
|--------------------------------------------------
*/
// @route  CHANGE api/employee/:id/earnings
// @desc   Update employee earnings
// @acces  Admin
router.put(
  "/:employeeId/earnings",
  auth,
  isAdmin,
  employeeControler.update.earnings
);

/**
|--------------------------------------------------
| DELETE EMPLOYEE PROFILE (SURNAME, EMAIL, PASSWORD)
|--------------------------------------------------
*/
// @route  DELETE api/employee/user/me
// @desc   Delete surname, email, password
// @acces  Private
router.delete("/me", auth, employeeControler.remove.currentProfile);

/**
|--------------------------------------------------
| DELETE EMPLOYEE BY ID
|--------------------------------------------------
*/
// @route  DELETE api/employee/:id
// @desc   Delete employee by id
// @acces  Admin
router.delete(
  "/:employeeId",
  auth,
  isAdmin,
  employeeControler.remove.employeeProfile
);

module.exports = router;
