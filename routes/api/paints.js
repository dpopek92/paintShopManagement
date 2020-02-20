const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { paintsControler } = require("../contolers/paints");

/**
|--------------------------------------------------
| NEW ORDER FOR PAINTS
|--------------------------------------------------
*/
// @route  POST api/paints/neworder
// @desc   new order for paints
// @acces  Private
router.post("/neworder", auth, paintsControler.post.newOrder);

/**
|--------------------------------------------------
| GET ORDERS BY MONTH
|--------------------------------------------------
*/
// @route  POST api/paints
// @desc   get orders by month
// @acces  Private
router.post("/", auth, paintsControler.get.ordersByMonth);

/**
|--------------------------------------------------
| GET ORDER BY ORDER ID
|--------------------------------------------------
*/
// @route  POST api/paints/:id
// @desc   get order by id
// @acces  Private
router.post("/:orderId", auth, paintsControler.get.orderById);

module.exports = router;
