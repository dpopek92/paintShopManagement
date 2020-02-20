const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const { sheetControler } = require("../contolers/sheet");

/**
|--------------------------------------------------
| GENERATE ORDER FILES
|--------------------------------------------------
*/
// @route  POST api/sheet/
// @desc   Generate all order files
// @acces  Public
router.post("/", auth, sheetControler.get.orderFiles);

/**
|--------------------------------------------------
| GENERATE LABEL
|--------------------------------------------------
*/
// @route  POST api/sheet/label/:orderId
// @desc   Generate label
// @acces  Admin/Employee
router.post("/label/:orderId", auth, sheetControler.get.orderLabel);

/**
|--------------------------------------------------
| GENERATE PICKUP REPORT
|--------------------------------------------------
*/
// @route  POST api/sheet/pickupreport/
// @desc   Generate pickup report
// @acces  Public
router.post("/pickupreport", auth, sheetControler.get.pickUpReport);

/**
|--------------------------------------------------
| GENERATE PRODUCTION LIST
|--------------------------------------------------
*/
// @route  POST api/sheet/productionlist
// @desc   Generate .xlsx productionlist
// @acces  Admin
router.post(
  "/productionlist",
  auth,
  isAdmin,
  sheetControler.get.productionList
);

/**
|--------------------------------------------------
| GET PDF IMAGE
|--------------------------------------------------
*/
// @route  POST api/sheet/getpdf
// @desc   Get .pdf image from order
// @acces  Public
router.post("/getpdf", auth, sheetControler.get.pdfImage);

/**
|--------------------------------------------------
| GET EMPLOYEES MONTH REPORT
|--------------------------------------------------
*/
// @route  POST api/sheet/employees/report
// @desc   Get employees month report by posiiotn
// @acces  Admin
router.post(
  "/employees/report",
  auth,
  isAdmin,
  sheetControler.get.employeesMonthReport
);

/**
|--------------------------------------------------
| GET SHEET TEMPLATE FOR DATA IMPORT TO NEW ORDER
|--------------------------------------------------
*/
// @route  POST api/sheet/neworder/template
// @desc   Get sheet template for data import to new order
// @acces  Public
router.get(
  "/neworder/template",
  auth,
  sheetControler.get.getNewOrderSheetTemplate
);

module.exports = router;
