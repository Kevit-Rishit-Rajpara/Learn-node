const express = require("express");
const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controller/orders");
const validate = require('../middleware/validate');
const { createOrderSchema } = require('../validators/orders');
const router = express.Router();

router.get("/", checkAuth, OrdersController.getAllOrders);

router.post("/", checkAuth, validate(createOrderSchema), OrdersController.createOrder);

router.get("/:orderId", checkAuth, OrdersController.getOrderDetails);

router.put("/:orderId", checkAuth, OrdersController.upldateOrder);

router.delete("/:orderId", checkAuth, OrdersController.deleteOrder);

module.exports = router;
