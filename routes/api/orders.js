const express = require("express");
const multer = require("multer");

const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
const { isEmployee } = require("../helpers/common");

const { stopOrder } = require("../actions/orders/production");

const { ordersContoler } = require("../contolers/orders");

/**
|--------------------------------------------------
| GET ORDER BY ORDER_ID
|--------------------------------------------------
*/
// @route  GET api/orders/id/:order_id
// @desc   Get order by id
// @acces  Private
router.get("/id/:orderId", auth, ordersContoler.get.orderById);

/**
|--------------------------------------------------
| GET MY ORDERS
|--------------------------------------------------
*/
// @route  GET api/orders/me
// @desc   Get basic orders list
// @acces  Private
router.get("/me", auth, ordersContoler.get.myOrders);

/**
|--------------------------------------------------
| GET NUMBER OF NEW ORDERS
|--------------------------------------------------
*/
// @route  GET api/orders/admin/new/number
// @desc   Get number of new orders
// @acces  Admin
router.get(
  "/admin/new/number",
  auth,
  isAdmin,
  ordersContoler.get.numberOfNewOrders
);

/**
|--------------------------------------------------
| GET ALL ORDERS IN PRODUCTION
|--------------------------------------------------
*/
// @route  GET api/orders/admin/inproduction
// @desc   Get all orders in production
// @acces  Admin/Display
router.get("/admin/inproduction", auth, ordersContoler.get.ordersInProduction);

/**
|--------------------------------------------------
| GET ORDERS IN PRODUCTION TO ORDER PAINTS
|--------------------------------------------------
*/
// @route  GET api/orders/paintsorder
// @desc   Get orders in production to order paints
// @acces  Admin/Employee
router.get("/paintsorder", auth, ordersContoler.get.ordersToPaintsOrder);

/**
|--------------------------------------------------
| GET ORDERS BY USER_ID
|--------------------------------------------------
*/
// @route  GET api/orders/admin/user/:user_id
// @desc   Get orders by user id
// @acces  Admin
router.get("/admin/user/:userId", auth, isAdmin, ordersContoler.get.userOrders);

/**
|--------------------------------------------------
| GET ENDED ORDERS IN MONTH BY USER_ID
|--------------------------------------------------
*/
// @route  GET api/orders/:userId/:month/:year
// @desc   Get ended orders in month by user id
// @acces  Admin
router.get(
  "/:userId/:month/:year",
  auth,
  isAdmin,
  ordersContoler.get.userOrdersEndedInMonth
);

/**
|--------------------------------------------------
| GET ORDERs BY ARRAY OF ID
|--------------------------------------------------
*/
// @route  GET api/orders/id_array
// @desc   Get orders by ids array
// @acces  Admin
router.post("/id_array", auth, isAdmin, ordersContoler.get.ordersByIdsArray);

/**
|--------------------------------------------------
| GET ALL NEW ORDERS
|--------------------------------------------------
*/
// @route  GET api/orders/admin/new
// @desc   Get all new orders
// @acces  Admin
router.get("/admin/new", auth, isAdmin, ordersContoler.get.newOrders);

/**
|--------------------------------------------------
| GET ENDED ORDERS
|--------------------------------------------------
*/
// @route  GET api/orders/admin/ended
// @desc   Get all ended orders
// @acces  Admin
router.post("/admin/ended", auth, isAdmin, ordersContoler.get.endedOrders);

/**
|--------------------------------------------------
| GET ORDERS FOR POSITION
|--------------------------------------------------
*/
// @route  GET api/orders/employee/:productionStatus
// @desc   Get orders for position
// @acces  Admin/Employee
router.get("/employee/:position", auth, ordersContoler.get.ordersForPosition);

/**
|--------------------------------------------------
| FIND ORDER
|--------------------------------------------------
*/
// @route  GET api/orders/admin/find
// @desc   Find order
// @acces  Admin
router.post("/admin/search", auth, isAdmin, ordersContoler.get.findOrder);

/**
|--------------------------------------------------
| CALCULATE ORDER
|--------------------------------------------------
*/
// @route  PUT api/orders/calculate
// @desc   Calculate order price
// @acces  Private
router.put("/calculate", auth, ordersContoler.post.calculateOrderPrice);

/**
|--------------------------------------------------
| CREATE NEW ORDER
|--------------------------------------------------
*/
// @route  POST api/orders
// @desc   Create a new order
// @acces  Admin/User
router.post("/", [auth, upload.array("file")], ordersContoler.post.newOrder);

/**
|--------------------------------------------------
| UPDATE ORDER
|--------------------------------------------------
*/
// @route  POST api/orders/updateorder
// @desc   Update order
// @acces  Private
router.post(
  "/updateorder",
  [auth, upload.array("file")],
  ordersContoler.post.editOrder
);

/**
|--------------------------------------------------
| UPDATE ORDER STATUS
|--------------------------------------------------
*/
// @route  PUT api/orders/:order_id
// @desc   Update order status by order id
// @acces  Admin/Employee
router.put("/:orderId", auth, ordersContoler.update.orderStatus);

/**
|--------------------------------------------------
| ADD ORDER STATUS
|--------------------------------------------------
*/
// @route  PUT api/orders/addstatus/:orderId
// @desc   Add order status by order id
// @acces  Private
router.put("/addstatus/:orderId", auth, ordersContoler.update.addOrderStatus);

/**
|--------------------------------------------------
| ORDER READY TO PICK UP
|--------------------------------------------------
*/
// @route  PUT api/orders/readytopickup/:orderId
// @desc   Order ready to pick up
// @acces  Private
router.put(
  "/readytopickup/:orderId",
  auth,
  ordersContoler.update.setReadyToPickUp
);

/**
|--------------------------------------------------
| UPDATE ORDER PRICE
|--------------------------------------------------
*/
// @route  PUT api/orders/price/:orderId
// @desc   Update order price by order id
// @acces  Admin
router.put("/price/:orderId", auth, isAdmin, ordersContoler.update.orderPrice);

/**
|--------------------------------------------------
| UPDATE ORDER MAN HOURS 
|--------------------------------------------------
*/
// @route  PUT api/orders/manhours/:orderId
// @desc   Update order manHours by order id
// @acces  Private
router.put(
  "/manhours/:orderId",
  auth,
  isAdmin,
  ordersContoler.update.setManHours
);

/**
|--------------------------------------------------
| UPDATE PAID STATUS
|--------------------------------------------------
*/
// @route  PUT api/orders/paidstatus/:orderId
// @desc   Update order paid status by order id
// @acces  Admin
router.put(
  "/paidstatus/:orderId",
  auth,
  isAdmin,
  ordersContoler.update.paidStatus
);

/**
|--------------------------------------------------
| UPDATE ORDER PAINT MAKERS
|--------------------------------------------------
*/
// @route  PUT api/orders/paintmaker/:orderId
// @desc   Update order paint makers by order id
// @acces  Admin
router.put(
  "/paintmaker/:orderId",
  auth,
  isAdmin,
  ordersContoler.update.paintMakers
);

/**
|--------------------------------------------------
| UPDATE ORDER PRODUCTION FINISH DATE
|--------------------------------------------------
*/
// @route  PUT api/orders/date/:orderId
// @desc   Update order production finish date by order id
// @acces  Admin
router.put(
  "/date/:orderId",
  auth,
  isAdmin,
  ordersContoler.update.productionFinishDate
);

/**
|--------------------------------------------------
| SET ORDER PRIORITY
|--------------------------------------------------
*/
// @route  PUT api/orders/priority/:orderId
// @desc   Set order priority
// @acces  Admin
router.put(
  "/priority/:orderId",
  auth,
  isAdmin,
  ordersContoler.update.setOrderPriority
);

/**
|--------------------------------------------------
| ADD EMPLOYEE COMMENT
|--------------------------------------------------
*/
// @route  PUT api/orders/employeecomment/:orderId
// @desc   Add employee comment
// @acces  Private
router.put(
  "/employeecomment/:orderId",
  auth,
  ordersContoler.update.addProductionComment
);

/**
|--------------------------------------------------
| START ORDER
|--------------------------------------------------
*/
// @route  PUT api/orders/startorder/:orderId
// @desc   Start order
// @acces  Employee
router.put("/startorder/:orderId", auth, ordersContoler.update.startOrder);

/**
|--------------------------------------------------
| PAUSE ORDER
|--------------------------------------------------
*/
// @route  PUT api/orders/pause/:orderId
// @desc   Pause order
// @acces  Employee
router.put("/pause/:orderId", auth, ordersContoler.update.pauseOrder);

/**
|--------------------------------------------------
| REPORT LOST ELEMENTS
|--------------------------------------------------
*/
// @route  PUT api/orders/lostelements/:orderId
// @desc   Report lost elements
// @acces  Admin/Employee
router.put(
  "/lostelements/:orderId",
  auth,
  ordersContoler.update.reportLostElements
);

/**
|--------------------------------------------------
| REPORT ELEMENTS TO CORRECT
|--------------------------------------------------
*/
// @route  PUT api/orders/elementstocorrect/:orderId
// @desc   Report elements to correct
// @acces  Admin/Employee

router.put(
  "/elementstocorrect/:orderId",
  auth,
  ordersContoler.update.reportElementsToCorrect
);

/**
|--------------------------------------------------
| STOP ORDER
|--------------------------------------------------
*/
// @route  PUT api/orders/stoporder/:order_id
// @desc   Stop order
// @acces  Employee
router.put("/stoporder/:order_id", auth, async (req, res) => {
  const orderId = req.params.order_id;
  const user = req.user;
  const { orderEmployees, position, halfGrinding, isOrderCompleted } = req.body;
  orderEmployees.push(req.user.id);
  const employeesIds = orderEmployees.map(item => {
    return { _id: item };
  });

  try {
    const isEmployeePermission = await isEmployee(user);

    if (!isEmployeePermission) {
      console.error(`STOP ORDER: user ${req.user.id} is not employee`);
      return res.json({
        msg: "You can not do this"
      });
    }

    const order = await stopOrder(
      orderId,
      employeesIds,
      position,
      halfGrinding,
      isOrderCompleted
    );
    console.log(`---===${position.toUpperCase()}===---`);

    if (order) return res.json(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ info: "Server error", msg: err.message });
  }
});

/**
|--------------------------------------------------
| DELETE ORDER
|--------------------------------------------------
*/
// @route  DELETE api/orders/:orderId
// @desc   Delete order by id
// @acces  Admin/User
router.delete("/:orderId", auth, ordersContoler.remove.orderById);

module.exports = router;
