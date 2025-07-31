const express = require("express");
const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controller/orders");
const router = express.Router();

router.get("/", checkAuth, OrdersController.getAllOrders);

router.post("/", checkAuth, OrdersController.createOrder);

router.get("/:orderId", checkAuth, OrdersController.getOrderDetails);

router.put("/:orderId", checkAuth, OrdersController.upldateOrder);

router.delete("/:orderId", checkAuth, OrdersController.deleteOrder);

module.exports = router;
