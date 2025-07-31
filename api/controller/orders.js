
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.getAllOrders = (req, res, next) => {
    Order.find()
      .populate("product", "name")
      .exec()
      .then((orders) => {
        res.status(200).json({
          message: "Orders retrieved successfully",
          count: orders.length,
          orders: orders,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  }


exports.getOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
      .populate("product")
      .exec()
      .then((order) => {
        if (order) {
          res.status(200).json({
            message: "Order retrieved successfully",
            order: order,
          });
        } else {
          res.status(404).json({
            message: "Order not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
}
  
exports.createOrder = (req, res, next) => {
    Product.findById(req.body.productId)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found",
          });
        }
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          product: req.body.productId,
          quantity: req.body.quantity,
        });
        return order.save();
      })
      .then((result) => {
        res.status(201).json({
          message: "Order created successfully",
          createdOrder: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  }

exports.upldateOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    const orderStatus = req.body.orderStatus;
    res.status(200).json({
      message: "Order updated successfully",
      orderId: orderId,
      orderStatus: orderStatus,
    });
}
  
exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
      message: "Order deleted successfully",
      orderId: orderId,
    });
  }