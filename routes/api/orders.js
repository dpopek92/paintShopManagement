const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const { validateNewOrder, checkValidation } = require("../utils/validation");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./files/temp/`);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const ordersControler = require("../controlers/orders");

/**
|--------------------------------------------------
| GET NEW ORDERS
|--------------------------------------------------
*/
// @route  POST api/orders/
// @desc   Create new order
// @acces  Public
router.get("/new", auth, isAdmin, ordersControler.get.new);

/**
|--------------------------------------------------
| CREATE NEW ORDER
|--------------------------------------------------
*/
// @route  POST api/orders/
// @desc   Create new order
// @acces  Public
router.post(
  "/",
  [auth, upload.array("file")],
  // [validateNewOrder, checkValidation],
  ordersControler.post.newOrder
);

module.exports = router;
